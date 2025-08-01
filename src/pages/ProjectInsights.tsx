import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface ProjectInsightsProps {
  setCurrentView?: (view: string) => void;
}

interface Task {
  id: number;
  name: string;
  project: string;
  team: string;
  user: string;
  section: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Completed' | 'Closed' | 'On Hold' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  overdue: boolean;
  completedDate: string | null;
  dueDate: string | null;
}

export default function ProjectInsights({ setCurrentView }: ProjectInsightsProps) {
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Mock data
  const masterTasks: Task[] = [
    { id: 1, name: 'Homepage Design Mockup', project: 'Website Redesign', team: 'Design', user: 'Laura', section: 'Design Phase', status: 'In Progress', priority: 'High', overdue: false, completedDate: null, dueDate: '2025-01-15' },
    { id: 2, name: 'API Authentication Setup', project: 'API Integration', team: 'Development', user: 'Clif', section: 'Backend Development', status: 'Overdue', priority: 'Critical', overdue: true, completedDate: null, dueDate: '2025-01-05' },
    { id: 3, name: 'Q1 Campaign Strategy', project: 'Q1 Marketing', team: 'Marketing', user: 'Serkan', section: 'Planning', status: 'In Review', priority: 'Medium', overdue: false, completedDate: null, dueDate: '2025-01-20' },
    { id: 4, name: 'Database Schema Design', project: 'Website Redesign', team: 'Development', user: 'Clif', section: 'Backend Development', status: 'To Do', priority: 'High', overdue: false, completedDate: null, dueDate: '2025-01-18' },
    { id: 5, name: 'Mobile App Navigation', project: 'Mobile App', team: 'Development', user: 'Serkan', section: 'Frontend Development', status: 'In Progress', priority: 'Medium', overdue: false, completedDate: null, dueDate: '2025-01-25' },
    { id: 6, name: 'Social Media Content', project: 'Q1 Marketing', team: 'Marketing', user: 'Laura', section: 'Content Creation', status: 'Completed', priority: 'Low', overdue: false, completedDate: '2025-01-08', dueDate: '2025-01-10' },
    { id: 7, name: 'Logo Redesign', project: 'Website Redesign', team: 'Design', user: 'Laura', section: 'Design Phase', status: 'On Hold', priority: 'Low', overdue: false, completedDate: null, dueDate: '2025-02-01' },
    { id: 8, name: 'Payment Gateway Integration', project: 'API Integration', team: 'Development', user: 'Bram', section: 'Backend Development', status: 'In Progress', priority: 'Critical', overdue: true, completedDate: null, dueDate: '2025-01-03' },
    { id: 9, name: 'User Testing Report', project: 'Mobile App', team: 'Design', user: 'Clif', section: 'Testing', status: 'Closed', priority: 'Medium', overdue: false, completedDate: '2025-01-07', dueDate: '2025-01-08' },
    { id: 10, name: 'Color Palette Selection', project: 'Website Redesign', team: 'Design', user: 'Laura', section: 'Design Phase', status: 'In Progress', priority: 'Low', overdue: false, completedDate: null, dueDate: '2025-01-16' },
    { id: 11, name: 'Email Campaign Setup', project: 'Q1 Marketing', team: 'Marketing', user: 'Serkan', section: 'Campaign Management', status: 'To Do', priority: 'Medium', overdue: false, completedDate: null, dueDate: '2025-01-22' },
    { id: 12, name: 'Security Audit', project: 'API Integration', team: 'Development', user: 'Bram', section: 'Security', status: 'Cancelled', priority: 'High', overdue: false, completedDate: null, dueDate: '2025-01-30' },
    { id: 13, name: 'App Store Submission', project: 'Mobile App', team: 'Development', user: 'Clif', section: 'Deployment', status: 'To Do', priority: 'High', overdue: false, completedDate: null, dueDate: '2025-02-15' },
    { id: 14, name: 'Performance Optimization', project: 'Website Redesign', team: 'Development', user: 'Bram', section: 'Optimization', status: 'In Review', priority: 'Medium', overdue: false, completedDate: null, dueDate: '2025-01-28' },
    { id: 15, name: 'Analytics Implementation', project: 'Q1 Marketing', team: 'Marketing', user: 'Serkan', section: 'Analytics', status: 'To Do', priority: 'High', overdue: true, completedDate: null, dueDate: '2025-01-04' },
    { id: 16, name: 'Project Documentation', project: 'Website Redesign', team: 'Design', user: 'Laura', section: 'Documentation', status: 'Closed', priority: 'Low', overdue: false, completedDate: '2025-01-06', dueDate: '2025-01-08' },
  ];

  // Get unique values for filters
  const projects = [...new Set(masterTasks.map(task => task.project))];
  const teams = [...new Set(masterTasks.map(task => task.team))];
  const users = [...new Set(masterTasks.map(task => task.user))];
  const statuses = [...new Set(masterTasks.map(task => task.status))];

  // Filter tasks based on selected filters
  const filteredTasks = masterTasks.filter(task => 
    (selectedProject === 'all' || task.project === selectedProject) &&
    (selectedTeam === 'all' || task.team === selectedTeam) &&
    (selectedUser === 'all' || task.user === selectedUser) &&
    (selectedStatus === 'all' || task.status === selectedStatus)
  );

  // Calculate statistics
  const completedTasks = filteredTasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = filteredTasks.filter(task => task.status === 'In Progress').length;
  const todoTasks = filteredTasks.filter(task => task.status === 'To Do').length;
  const inReviewTasks = filteredTasks.filter(task => task.status === 'In Review').length;
  const closedTasks = filteredTasks.filter(task => task.status === 'Closed').length;
  const onHoldTasks = filteredTasks.filter(task => task.status === 'On Hold').length;
  const cancelledTasks = filteredTasks.filter(task => task.status === 'Cancelled').length;
  const totalTasks = filteredTasks.length;
  
  // Overdue is a property, not a status
  const overdueTasks = filteredTasks.filter(task => task.overdue === true).length;
  
  // Priority statistics (if needed for other features)
  const criticalTasks = filteredTasks.filter(task => task.priority === 'Critical').length;
  const highPriorityTasks = filteredTasks.filter(task => task.priority === 'High').length;

  // Filter count helper
  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedProject !== 'all') count++;
    if (selectedTeam !== 'all') count++;
    if (selectedUser !== 'all') count++;
    if (selectedStatus !== 'all') count++;
    return count;
  };

  // Chart data preparations
  const getTasksByStatus = () => {
    // Only show statuses that actually exist in the data
    const allStatuses = {
      'To Do': { count: todoTasks, color: '#6b7280' },
      'In Progress': { count: inProgressTasks, color: '#8b5cf6' },
      'In Review': { count: inReviewTasks, color: '#f59e0b' },
      'Completed': { count: completedTasks, color: '#10b981' },
      'Closed': { count: closedTasks, color: '#4b5563' },
      'On Hold': { count: onHoldTasks, color: '#9333ea' },
      'Cancelled': { count: cancelledTasks, color: '#64748b' }
    };

    // Filter to only include statuses that exist in the data
    const existingStatuses = Object.entries(allStatuses).filter(([status, data]) => {
      return data.count > 0 || filteredTasks.some(task => task.status === status);
    });

    const labels = existingStatuses.map(([status]) => status);
    const data = existingStatuses.map(([, statusData]) => statusData.count);
    const backgroundColor = existingStatuses.map(([, statusData]) => statusData.color);

    return {
      labels,
      datasets: [{
        label: 'Task Count',
        data,
        backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
      }]
    };
  };

  const getUpcomingTasksByAssignee = () => {
    // Upcoming tasks are all tasks that are not completed or closed
    const upcomingTasks = filteredTasks.filter(task => 
      task.status !== 'Completed' && task.status !== 'Closed'
    );
    const assigneeCounts = upcomingTasks.reduce((acc, task) => {
      acc[task.user] = (acc[task.user] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(assigneeCounts),
      datasets: [{
        label: 'Upcoming Tasks',
        data: Object.values(assigneeCounts),
        backgroundColor: '#8b5cf6',
        borderColor: '#8b5cf6',
        borderWidth: 1,
      }]
    };
  };

  const getTasksByCompletionStatus = () => {
    // Simple completion status: Complete, Incomplete, Overdue
    const incompleteTasks = filteredTasks.length - completedTasks - closedTasks;
    
    const completionStatuses = {
      'Incomplete': { count: incompleteTasks, color: '#8b5cf6' },
      'Completed': { count: completedTasks + closedTasks, color: '#10b981' },
      'Overdue': { count: overdueTasks, color: '#ef4444' }
    };

    // Filter to only include statuses that have tasks
    const existingStatuses = Object.entries(completionStatuses).filter(([, data]) => {
      return data.count > 0;
    });

    const labels = existingStatuses.map(([status]) => status);
    const data = existingStatuses.map(([, statusData]) => statusData.count);
    const backgroundColor = existingStatuses.map(([, statusData]) => statusData.color);
    
    return {
      labels,
      datasets: [{
        data,
        backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 2,
      }]
    };
  };

  const getCompletionOverTime = () => {
    const completed = filteredTasks.filter(task => task.status === 'Completed');
    const completions = completed.reduce((acc, task) => {
      if (task.completedDate) {
        const date = task.completedDate.slice(8, 10); // Day of month
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: ['25/07', '26/07', '27/07', '28/07', '29/07', '30/07', '31/07'],
      datasets: [{
        label: 'Completed',
        data: [0, 0, 0, 0, 0, completions['30'] || 0, completions['31'] || 0],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
      }]
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#374151'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        labels: {
          color: '#374151'
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#374151'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView && setCurrentView('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Project Insights</h1>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm px-3 py-2"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
              
              <select 
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm px-3 py-2"
              >
                <option value="all">All Teams</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              
              <select 
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm px-3 py-2"
              >
                <option value="all">All Users</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
              
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm px-3 py-2"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <button 
                onClick={() => {
                  setSelectedProject('all');
                  setSelectedTeam('all');
                  setSelectedUser('all');
                  setSelectedStatus('all');
                }}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Reset Filters
              </button>
              
              <button className="text-sm font-semibold text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        {/* KPI Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total completed tasks</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{completedTasks}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {getActiveFiltersCount() > 0 ? `= ${getActiveFiltersCount()} Filter${getActiveFiltersCount() > 1 ? 's' : ''}` : '= No Filters'}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total incomplete tasks</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{filteredTasks.length - completedTasks - closedTasks}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {getActiveFiltersCount() > 0 ? `= ${getActiveFiltersCount()} Filter${getActiveFiltersCount() > 1 ? 's' : ''}` : '= No Filters'}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total overdue tasks</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{overdueTasks}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {getActiveFiltersCount() > 0 ? `= ${getActiveFiltersCount()} Filter${getActiveFiltersCount() > 1 ? 's' : ''}` : '= No Filters'}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total tasks</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{totalTasks}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {getActiveFiltersCount() > 0 ? `= ${getActiveFiltersCount()} Filter${getActiveFiltersCount() > 1 ? 's' : ''}` : '= No Filters'}
            </div>
          </div>
        </div>

        {/* Chart Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks by Status */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Total incomplete tasks by section</h3>
            </div>
            <div className="px-6 pb-6">
              <div className="h-80">
                <Bar data={getTasksByStatus()} options={chartOptions} />
              </div>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  = {getActiveFiltersCount()} Filter{getActiveFiltersCount() !== 1 ? 's' : ''}
                </div>
                <button className="text-xs text-gray-600 hover:text-gray-900">See all</button>
              </div>
            </div>
          </div>
          
          {/* Task Flow Status */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Task by status</h3>
            </div>
            <div className="px-6 pb-6">
              <div className="h-80">
                <Doughnut data={getTasksByCompletionStatus()} options={doughnutOptions} />
              </div>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  = {getActiveFiltersCount()} Filter{getActiveFiltersCount() !== 1 ? 's' : ''}
                </div>
                <button className="text-xs text-gray-600 hover:text-gray-900">See all</button>
              </div>
            </div>
          </div>
          
          {/* Upcoming tasks by assignee */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Total upcoming tasks by assignee</h3>
            </div>
            <div className="px-6 pb-6">
              <div className="h-80">
                <Bar data={getUpcomingTasksByAssignee()} options={chartOptions} />
              </div>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  = {getActiveFiltersCount()} Filter{getActiveFiltersCount() !== 1 ? 's' : ''}
                </div>
                <button className="text-xs text-gray-600 hover:text-gray-900">See all</button>
              </div>
            </div>
          </div>
          
          {/* Task completion over time */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Task completion over time</h3>
            </div>
            <div className="px-6 pb-6">
              <div className="h-80">
                <Line data={getCompletionOverTime()} options={lineOptions} />
              </div>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {getActiveFiltersCount() > 0 ? `= ${getActiveFiltersCount()} Filter${getActiveFiltersCount() > 1 ? 's' : ''}` : '= No Filters'}
                </div>
                <button className="text-xs text-gray-600 hover:text-gray-900">See all</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}