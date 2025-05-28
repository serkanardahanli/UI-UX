import React, { useState } from 'react';
import { ArrowLeft, Share2, MoreHorizontal, Users, Activity, Calendar, Clock, AlertTriangle, TrendingUp, Star, Plus, Edit3, CheckCircle2, Circle, AlertCircle, Timer, BarChart3, PieChart, Target, Zap, MessageSquare, Paperclip, Flag, ChevronDown } from 'lucide-react';
import CreateTaskActivity from '../components/CreateTaskActivity';

interface ProjectOverviewProps {
  setCurrentView?: (view: string) => void;
}

export default function ProjectOverview({ setCurrentView }: ProjectOverviewProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [projectStatus, setProjectStatus] = useState('On Track');
  
  // CreateTaskActivity popup state management
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [createPopupType, setCreatePopupType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const projectData = {
    name: 'Website Redesign Homepage',
    status: projectStatus,
    startDate: '12 Sep 2024',
    endDate: '23 days left',
    lastUpdated: 'Today at 10:23 AM',
    owners: [
      { name: 'Serkan Ardahanli', avatar: 'SA', color: 'bg-pink-500' },
      { name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' }
    ],
    members: [
      { name: 'Serkan Ardahanli', avatar: 'SA', color: 'bg-pink-500' },
      { name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' },
      { name: 'Michael Chen', avatar: 'MC', color: 'bg-purple-500' },
      { name: 'Sarah Johnson', avatar: 'SJ', color: 'bg-green-500' },
      { name: 'Alex Morgan', avatar: 'AM', color: 'bg-orange-500' },
      { name: 'Lisa Park', avatar: 'LP', color: 'bg-indigo-500' }
    ],
    tasks: {
      total: 23,
      completed: 12,
      inProgress: 8,
      overdue: 3
    },
    activity: {
      updates: 32,
      topContributor: 'Sarah Johnson',
      trend: '+18% more than last week'
    },
    linkedModules: [
      { name: 'Sales Tool', icon: '📊', color: 'bg-blue-100 text-blue-700' },
      { name: 'Support Tool', icon: '🎧', color: 'bg-green-100 text-green-700' },
      { name: 'CRM', icon: '👥', color: 'bg-purple-100 text-purple-700' }
    ],
    projectResources: [
      { 
        type: 'documentation',
        name: 'Project Requirements',
        icon: '📄',
        lastUpdated: '2 days ago',
        author: 'Sarah Johnson',
        inFlowQiDocs: true
      },
      {
        type: 'design',
        name: 'UI Mockups v2.3',
        icon: '🎨',
        lastUpdated: 'Yesterday',
        author: 'Emma Wilson',
        fileType: 'Figma'
      },
      {
        type: 'meeting',
        name: 'Sprint Planning Notes',
        icon: '📝',
        lastUpdated: 'Today at 11:00',
        author: 'Michael Chen',
        inFlowQiDocs: true
      },
      {
        type: 'spreadsheet',
        name: 'Budget Tracker',
        icon: '📊',
        lastUpdated: '5 days ago',
        author: 'Alex Morgan',
        fileType: 'Excel'
      }
    ],
    recentActivity: [
      { user: 'Sarah Johnson', action: 'added 3 tasks to UI Development', time: 'Today at 9:32 AM', avatar: 'SJ', color: 'bg-green-500' },
      { user: 'Cliff Anderson', action: 'closed milestone Design Approval', time: 'Yesterday at 4:12 PM', avatar: 'CA', color: 'bg-gray-500' },
      { user: 'Michael Chen', action: 'commented on User Testing Plan', time: 'Yesterday at 2:45 PM', avatar: 'MC', color: 'bg-purple-500' }
    ],
    upcomingMilestones: [
      { title: 'Finalize UI Mockups', assignee: 'Sarah Johnson', due: 'Due Tomorrow', status: 'warning' },
      { title: 'API Integration', assignee: 'Cliff Anderson', due: 'Due in 3 days', status: 'normal' },
      { title: 'QA Testing Plan', assignee: 'Michael Wilson', due: 'Due in 5 days', status: 'normal' }
    ],
    timeTracking: {
      total: 80,
      used: 65,
      percentage: 81
    },
    risks: {
      resourceAllocation: 'Low',
      timelinePressure: 'Medium',
      technicalComplexity: 'High'
    }
  };

  const statusColors = {
    'On Track': 'bg-green-100 text-green-700 border-green-200',
    'At Risk': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Delayed': 'bg-red-100 text-red-700 border-red-200',
    'On Hold': 'bg-gray-100 text-gray-700 border-gray-200',
    'Completed': 'bg-blue-100 text-blue-700 border-blue-200'
  };

  const statusOptions = [
    { value: 'On Track', icon: CheckCircle2, color: 'text-green-600' },
    { value: 'At Risk', icon: AlertTriangle, color: 'text-yellow-600' },
    { value: 'Delayed', icon: AlertCircle, color: 'text-red-600' },
    { value: 'On Hold', icon: Clock, color: 'text-gray-600' },
    { value: 'Completed', icon: CheckCircle2, color: 'text-blue-600' }
  ];

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === 'Completed') {
      setShowCompleteModal(true);
    } else {
      setProjectStatus(newStatus);
    }
    setShowStatusDropdown(false);
  };

  const handleCompleteProject = () => {
    setProjectStatus('Completed');
    setShowCompleteModal(false);
    // Here you would typically make an API call to update the project
  };

  // Functions for popup management
  const openCreatePopup = (type = '') => {
    setCreatePopupType(type);
    setShowCreatePopup(true);
  };

  const closeCreatePopup = () => {
    setShowCreatePopup(false);
    setCreatePopupType('');
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => showStatusDropdown && setShowStatusDropdown(false)}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView && setCurrentView('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-gray-900">{projectData.name}</h1>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowStatusDropdown(!showStatusDropdown);
                      }}
                      className={`px-3 py-1 text-sm font-medium rounded-full border flex items-center gap-1.5 hover:opacity-80 transition-all ${statusColors[projectStatus]}`}
                    >
                      {projectStatus}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    
                    {/* Status Dropdown */}
                    {showStatusDropdown && (
                      <div 
                        className="absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {statusOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleStatusChange(option.value)}
                              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                                projectStatus === option.value ? 'bg-gray-50' : ''
                              }`}
                            >
                              <Icon className={`w-4 h-4 ${option.color}`} />
                              <span className="text-gray-700">{option.value}</span>
                              {option.value === 'Completed' && (
                                <span className="ml-auto text-xs text-gray-500">Final</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{projectData.startDate} – {projectStatus === 'Completed' ? 'Completed' : projectData.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: {projectData.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              {projectStatus !== 'Completed' && (
                <button 
                  onClick={() => openCreatePopup('task')}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              )}
              {projectStatus === 'Completed' && (
                <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Project Completed
                </button>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Project Owners */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-gray-600">Project Owners:</span>
            <div className="flex items-center -space-x-2">
              {projectData.owners.map((owner, i) => (
                <div key={i} className={`w-8 h-8 ${owner.color} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white`}>
                  {owner.avatar}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Completed Project Banner */}
        {projectStatus === 'Completed' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Project Completed</h3>
                <p className="text-sm text-gray-600">This project was marked as completed on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Summary</button>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Stats */}
          <div className="col-span-8 space-y-6">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Members Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Members</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-3">{projectData.members.length} people</div>
                <div className="flex -space-x-2 mb-3">
                  {projectData.members.slice(0, 5).map((member, i) => (
                    <div key={i} className={`w-8 h-8 ${member.color} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white`}>
                      {member.avatar}
                    </div>
                  ))}
                  {projectData.members.length > 5 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white text-gray-600">
                      +{projectData.members.length - 5}
                    </div>
                  )}
                </div>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">Manage team</button>
              </div>

              {/* Tasks Summary Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Tasks Summary</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-3">{projectData.tasks.total} total</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-green-600">{projectData.tasks.completed}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-medium text-blue-600">{projectData.tasks.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Overdue</span>
                    <span className="font-medium text-red-600">{projectData.tasks.overdue}</span>
                  </div>
                </div>
              </div>

              {/* Activity Score Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Activity Score</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-3">{projectData.activity.updates} updates</div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-medium">
                    SJ
                  </div>
                  <span className="text-sm text-gray-600">{projectData.activity.topContributor} has most actions</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">{projectData.activity.trend}</span>
                </div>
              </div>
            </div>

            {/* Task Status Chart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">Task Status</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="80" stroke="#E5E7EB" strokeWidth="24" fill="none" />
                    <circle cx="96" cy="96" r="80" stroke="#10B981" strokeWidth="24" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 80 * (projectData.tasks.completed / projectData.tasks.total)} ${2 * Math.PI * 80}`} 
                      strokeDashoffset="0" />
                    <circle cx="96" cy="96" r="80" stroke="#3B82F6" strokeWidth="24" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 80 * (projectData.tasks.inProgress / projectData.tasks.total)} ${2 * Math.PI * 80}`} 
                      strokeDashoffset={`-${2 * Math.PI * 80 * (projectData.tasks.completed / projectData.tasks.total)}`} />
                    <circle cx="96" cy="96" r="80" stroke="#EF4444" strokeWidth="24" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 80 * (projectData.tasks.overdue / projectData.tasks.total)} ${2 * Math.PI * 80}`} 
                      strokeDashoffset={`-${2 * Math.PI * 80 * ((projectData.tasks.completed + projectData.tasks.inProgress) / projectData.tasks.total)}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{Math.round((projectData.tasks.completed / projectData.tasks.total) * 100)}%</div>
                      <div className="text-sm text-gray-600">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Overdue</span>
                </div>
              </div>
            </div>

            {/* Time Tracking & Risk Factors */}
            <div className="grid grid-cols-2 gap-4">
              {/* Time Tracking */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Time Tracking</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Hours used</span>
                    <span className="text-sm font-medium text-gray-900">{projectData.timeTracking.used}/{projectData.timeTracking.total}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${projectData.timeTracking.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">{projectData.timeTracking.percentage}% utilized</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{projectData.timeTracking.used}h</div>
                    <div className="text-xs text-gray-500">Logged this week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{projectData.timeTracking.total - projectData.timeTracking.used}h</div>
                    <div className="text-xs text-gray-500">Remaining</div>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Risk Factors</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xs text-gray-600">Upload</span>
                  </div>
                </button>
                <button className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs text-purple-700 font-medium">FlowQi Docs</span>
                  </div>
                </button>
                <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-xs text-gray-600">Link</span>
                  </div>
                </button>
              </div>
              
              <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">Resource Allocation</span>
                      <span className="text-sm font-medium text-green-600">{projectData.risks.resourceAllocation}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">Timeline Pressure</span>
                      <span className="text-sm font-medium text-yellow-600">{projectData.risks.timelinePressure}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">Technical Complexity</span>
                      <span className="text-sm font-medium text-red-600">{projectData.risks.technicalComplexity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Milestones */}
          <div className="col-span-4 space-y-6">
            {/* Project Description */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Project Description</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Complete redesign of our mobile application with focus on improved user experience, performance optimization, and adding new features requested by our customers.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">UI/UX</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Mobile</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">High Priority</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Q3 Goals</span>
              </div>
            </div>

            {/* Project Resources */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-5 h-5 text-purple-600" />
                  <h3 className="font-medium text-gray-900">Project Resources</h3>
                </div>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Open Docs
                </button>
              </div>
              
              <div className="space-y-3">
                {projectData.projectResources.map((resource, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="text-2xl flex-shrink-0">{resource.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{resource.name}</h4>
                          {resource.inFlowQiDocs && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                              Docs
                            </span>
                          )}
                          {resource.fileType && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              {resource.fileType}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">{resource.lastUpdated}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{resource.author}</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Resource
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Recent Activity</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {projectData.recentActivity.map((activity, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Focus */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Upcoming Focus</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 mb-4">
                {projectData.upcomingMilestones.map((milestone, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{milestone.title}</h4>
                      <span className={`text-xs font-medium ${
                        milestone.status === 'warning' ? 'text-orange-600' : 'text-gray-600'
                      }`}>
                        {milestone.due}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-white text-[10px] font-medium">
                        {milestone.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-gray-600">{milestone.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className={`w-full px-4 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  projectStatus === 'Completed' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                disabled={projectStatus === 'Completed'}
              >
                <Plus className="w-4 h-4" />
                Add Milestone
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Project Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Complete Project?</h3>
                <p className="text-sm text-gray-600">Mark "{projectData.name}" as completed</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Project Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tasks</span>
                    <span className="font-medium text-gray-900">{projectData.tasks.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-green-600">{projectData.tasks.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium text-gray-900">3 months</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Add completion note (optional)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  rows={3}
                  placeholder="Add any final notes about the project..."
                />
              </div>
              
              <div className="flex items-start gap-2">
                <input type="checkbox" id="archive" className="mt-1 text-purple-600 rounded border-gray-300" />
                <label htmlFor="archive" className="text-sm text-gray-700">
                  Archive this project after completion
                  <span className="block text-xs text-gray-500">Project will be moved to archived projects</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCompleteProject}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Complete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CreateTaskActivity Popup */}
      {showCreatePopup && (
        <CreateTaskActivity
          isOpen={showCreatePopup}
          onClose={closeCreatePopup}
          type={createPopupType}
          onSuccess={(message) => {
            closeCreatePopup();
            showToastNotification(message);
          }}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
} 