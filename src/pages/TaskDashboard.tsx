import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Clock, Users, Calendar, Flag, Search, Filter, MoreHorizontal, Plus, ArrowLeft, Timer, User, Building2, Paperclip, MessageSquare, Star, Archive, Trash2, ChevronDown, X, Check, Eye, Edit3 } from 'lucide-react';
import TaskSidebar from './TaskSidebar';

interface TaskDashboardProps {
  setCurrentView?: (view: string) => void;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: {
    name: string;
    avatar: string;
    color: string;
  };
  project: string;
  dueDate: string;
  timeSpent: string;
  estimatedTime: string;
  tags: string[];
  attachments: number;
  comments: number;
  created: string;
  progress: number;
}

export default function TaskDashboard({ setCurrentView }: TaskDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState('my-tasks');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'
  const [showTaskSidebar, setShowTaskSidebar] = useState(false);

  // Task filters with counts
  const taskFilters = [
    { id: 'my-tasks', label: 'My Tasks', icon: User, count: 12, color: 'text-blue-600' },
    { id: 'assigned', label: 'Assigned to Me', icon: Users, count: 8, color: 'text-purple-600' },
    { id: 'in-progress', label: 'In Progress', icon: Clock, count: 5, color: 'text-orange-600' },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: 15, color: 'text-green-600' },
    { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: 3, color: 'text-red-600' },
    { id: 'high-priority', label: 'High Priority', icon: Flag, count: 4, color: 'text-red-500' }
  ];

  // Sample task data
  const tasks = [
    {
      id: 1,
      title: 'Complete project proposal for Google Netherlands',
      description: 'Finalize the project proposal including timeline, budget, and deliverables for the Q3 initiative.',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'Serkan Ardahanli', avatar: 'SA', color: 'bg-purple-500' },
      project: 'Website Redesign',
      dueDate: 'Today',
      timeSpent: '2h 30m',
      estimatedTime: '4h',
      tags: ['proposal', 'client'],
      attachments: 3,
      comments: 5,
      created: '2 days ago',
      progress: 65
    },
    {
      id: 2,
      title: 'Review API documentation',
      description: 'Go through the new API documentation and provide feedback on clarity and completeness.',
      status: 'todo',
      priority: 'medium',
      assignee: { name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' },
      project: 'CRM Integration',
      dueDate: 'Tomorrow',
      timeSpent: '45m',
      estimatedTime: '2h',
      tags: ['review', 'documentation'],
      attachments: 1,
      comments: 2,
      created: '1 day ago',
      progress: 20
    },
    {
      id: 3,
      title: 'Design system documentation',
      description: 'Create comprehensive documentation for the new design system components.',
      status: 'completed',
      priority: 'low',
      assignee: { name: 'Michael Chen', avatar: 'MC', color: 'bg-green-500' },
      project: 'Design System',
      dueDate: 'Yesterday',
      timeSpent: '3h',
      estimatedTime: '3h',
      tags: ['design', 'documentation'],
      attachments: 2,
      comments: 8,
      created: '5 days ago',
      progress: 100
    },
    {
      id: 4,
      title: 'Client presentation preparation',
      description: 'Prepare slides and demo for next week\'s client presentation.',
      status: 'overdue',
      priority: 'high',
      assignee: { name: 'Sarah Johnson', avatar: 'SJ', color: 'bg-orange-500' },
      project: 'Sales Presentation',
      dueDate: '2 days ago',
      timeSpent: '1h',
      estimatedTime: '4h',
      tags: ['presentation', 'client'],
      attachments: 0,
      comments: 3,
      created: '1 week ago',
      progress: 25
    },
    {
      id: 5,
      title: 'Update team dashboard',
      description: 'Add new metrics and improve the visualization of team performance data.',
      status: 'in-progress',
      priority: 'medium',
      assignee: { name: 'Alex Morgan', avatar: 'AM', color: 'bg-indigo-500' },
      project: 'Analytics Dashboard',
      dueDate: 'Next week',
      timeSpent: '30m',
      estimatedTime: '2h',
      tags: ['dashboard', 'metrics'],
      attachments: 1,
      comments: 1,
      created: '3 days ago',
      progress: 15
    },
    {
      id: 6,
      title: 'Bug fixes for mobile app',
      description: 'Fix reported issues with the mobile application including login flow and navigation.',
      status: 'todo',
      priority: 'high',
      assignee: { name: 'Lisa Park', avatar: 'LP', color: 'bg-pink-500' },
      project: 'Mobile App',
      dueDate: 'This week',
      timeSpent: '0h',
      estimatedTime: '6h',
      tags: ['bug-fix', 'mobile'],
      attachments: 2,
      comments: 4,
      created: '2 days ago',
      progress: 0
    }
  ];

  // Filter tasks based on selected filter and search
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = (() => {
      switch(selectedFilter) {
        case 'my-tasks': return true;
        case 'assigned': return task.assignee.name === 'Serkan Ardahanli';
        case 'in-progress': return task.status === 'in-progress';
        case 'completed': return task.status === 'completed';
        case 'overdue': return task.status === 'overdue';
        case 'high-priority': return task.priority === 'high';
        default: return true;
      }
    })();
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusConfig = (status) => {
    switch(status) {
      case 'completed': return { color: 'text-green-600 bg-green-50 border-green-200', icon: CheckCircle2, label: 'Completed' };
      case 'in-progress': return { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: Clock, label: 'In Progress' };
      case 'overdue': return { color: 'text-red-600 bg-red-50 border-red-200', icon: AlertCircle, label: 'Overdue' };
      case 'todo': return { color: 'text-gray-600 bg-gray-50 border-gray-200', icon: Circle, label: 'To Do' };
      default: return { color: 'text-gray-600 bg-gray-50 border-gray-200', icon: Circle, label: 'Unknown' };
    }
  };

  const getPriorityConfig = (priority) => {
    switch(priority) {
      case 'high': return { color: 'text-red-600 bg-red-50', label: 'High' };
      case 'medium': return { color: 'text-yellow-600 bg-yellow-50', label: 'Medium' };
      case 'low': return { color: 'text-green-600 bg-green-50', label: 'Low' };
      default: return { color: 'text-gray-600 bg-gray-50', label: 'Normal' };
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskSidebar(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView && setCurrentView('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-medium text-gray-900">Tasks</h1>
              <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                {filteredTasks.length} tasks
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 transition-colors ${viewMode === 'cards' ? 'bg-purple-50 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-purple-50 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="w-4 h-4 flex flex-col gap-0.5">
                    <div className="bg-current h-0.5 rounded-full"></div>
                    <div className="bg-current h-0.5 rounded-full"></div>
                    <div className="bg-current h-0.5 rounded-full"></div>
                  </div>
                </button>
              </div>
              
              {/* Add Task Button */}
              <button
                onClick={() => setShowTaskForm(true)}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Task
              </button>
              
              {/* More options */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Filters */}
        <div className="w-64 bg-white border-r border-gray-100 p-4">
          <div className="space-y-1">
            {taskFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${selectedFilter === filter.id ? 'text-purple-600' : filter.color}`} />
                    <span className="font-medium">{filter.label}</span>
                  </div>
                  {filter.count > 0 && (
                    <span className={`text-xs font-medium ${
                      selectedFilter === filter.id ? 'text-purple-600' : 'text-gray-400'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Archive className="w-4 h-4" />
              <span className="font-medium">Archived</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              <span className="font-medium">Deleted</span>
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-3">This Week</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-green-600">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">In Progress</span>
                <span className="font-medium text-blue-600">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Time logged</span>
                <span className="font-medium text-gray-900">12h 30m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Task Area */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'cards' ? (
            // Cards View
            <div className="p-6 h-full overflow-y-auto">
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {filteredTasks.map((task) => {
                  const statusConfig = getStatusConfig(task.status);
                  const priorityConfig = getPriorityConfig(task.priority);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer ${
                        selectedTask?.id === task.id ? 'ring-2 ring-purple-500 border-purple-300' : ''
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                            {task.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded ml-2">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.color}`}>
                          {priorityConfig.label}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      {task.progress > 0 && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Project and Tags */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 text-xs text-purple-600 mb-1">
                          <span>{task.project}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 2 && (
                            <span className="text-xs text-gray-400">+{task.tags.length - 2} more</span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 ${task.assignee.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                            {task.assignee.avatar}
                          </div>
                          <span className="text-xs text-gray-600">Due {task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {task.attachments > 0 && (
                            <div className="flex items-center gap-1">
                              <Paperclip className="w-3 h-3" />
                              <span>{task.attachments}</span>
                            </div>
                          )}
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{task.comments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {filteredTasks.length === 0 && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No tasks found</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // List View
            <div className="bg-white h-full">
              {/* List Header */}
              <div className="px-6 py-3 border-b border-gray-100">
                <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-4">Task</div>
                  <div className="col-span-2">Project</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Priority</div>
                  <div className="col-span-2">Assignee</div>
                  <div className="col-span-1">Due Date</div>
                  <div className="col-span-1">Progress</div>
                </div>
              </div>
              
              {/* List Items */}
              <div className="overflow-y-auto h-full">
                {filteredTasks.map((task) => {
                  const statusConfig = getStatusConfig(task.status);
                  const priorityConfig = getPriorityConfig(task.priority);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      className={`px-6 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedTask?.id === task.id ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Task */}
                        <div className="col-span-4">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {task.title}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {task.description}
                          </p>
                        </div>
                        
                        {/* Project */}
                        <div className="col-span-2">
                          <span className="text-sm text-purple-600">{task.project}</span>
                        </div>
                        
                        {/* Status */}
                        <div className="col-span-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                        </div>
                        
                        {/* Priority */}
                        <div className="col-span-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.color}`}>
                            {priorityConfig.label}
                          </span>
                        </div>
                        
                        {/* Assignee */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 ${task.assignee.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                              {task.assignee.avatar}
                            </div>
                            <span className="text-sm text-gray-900 truncate">{task.assignee.name}</span>
                          </div>
                        </div>
                        
                        {/* Due Date */}
                        <div className="col-span-1">
                          <span className="text-xs text-gray-600">{task.dueDate}</span>
                        </div>
                        
                        {/* Progress */}
                        <div className="col-span-1">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-purple-600 h-1.5 rounded-full"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 w-8">{task.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {filteredTasks.length === 0 && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No tasks found</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Create New Task</h3>
                <button 
                  onClick={() => setShowTaskForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="Enter task title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                  rows={3}
                  placeholder="Add description..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <button 
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Sidebar */}
      {showTaskSidebar && selectedTask && (
        <TaskSidebar 
          task={selectedTask}
          isOpen={showTaskSidebar}
          onClose={() => setShowTaskSidebar(false)}
        />
      )}
    </div>
  );
} 