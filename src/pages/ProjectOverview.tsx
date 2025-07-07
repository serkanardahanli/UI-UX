import React, { useState } from 'react';
import { ArrowLeft, Share2, MoreHorizontal, Users, Activity, Calendar, Clock, AlertTriangle, TrendingUp, Star, Plus, Edit3, CheckCircle2, Circle, AlertCircle, Timer, BarChart3, PieChart, Target, Zap, MessageSquare, Paperclip, Flag, ChevronDown, X } from 'lucide-react';
import CreateTaskActivity from '../components/CreateTaskActivity';

interface ProjectOverviewProps {
  setCurrentView?: (view: string) => void;
}

interface TeamMember {
  id: number;
  name: string;
  score: number;
  avatar: string;
  avatarBg: string;
  details: {
    completed: number;
    progress: number;
    updates: number;
    inTime: number;
    overdue: number;
    noDate: number;
  };
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
  
  // Team Activity Modal state management
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);

  // Team Activity Data
  const teamActivityData: TeamMember[] = [
    { id: 1, name: 'Clif', score: 66, avatar: 'C', avatarBg: 'bg-green-400', details: { completed: 50, progress: 10, updates: 14, inTime: 3, overdue: -9, noDate: -2 } },
    { id: 2, name: 'Serkan', score: 33, avatar: 'S', avatarBg: 'bg-blue-400', details: { completed: 25, progress: 10, updates: 18, inTime: 5, overdue: -15, noDate: -10 } },
    { id: 3, name: 'Laura', score: 58, avatar: 'L', avatarBg: 'bg-pink-400', details: { completed: 40, progress: 15, updates: 12, inTime: 8, overdue: -9, noDate: -8 } },
    { id: 4, name: 'Tom', score: 21, avatar: 'T', avatarBg: 'bg-red-400', details: { completed: 20, progress: 5, updates: 6, inTime: 2, overdue: -10, noDate: -2 } },
    { id: 5, name: 'Aisha', score: 45, avatar: 'A', avatarBg: 'bg-orange-400', details: { completed: 35, progress: 10, updates: 10, inTime: 5, overdue: -12, noDate: -3 } },
    { id: 6, name: 'Bram', score: 15, avatar: 'B', avatarBg: 'bg-indigo-400', details: { completed: 10, progress: 5, updates: 5, inTime: 1, overdue: -3, noDate: -3 } },
    { id: 7, name: 'Eva', score: 62, avatar: 'E', avatarBg: 'bg-emerald-400', details: { completed: 45, progress: 12, updates: 15, inTime: 10, overdue: -15, noDate: -5 } },
  ].sort((a, b) => b.score - a.score);

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
      total: 65,
      inProgress: 28,
      overdue: 12,
      noAssignment: 15,
      noDueDate: 10
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
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-medium text-green-600">{projectData.tasks.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Overdue</span>
                    <span className="font-medium text-red-600">{projectData.tasks.overdue}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">No Assignment</span>
                    <span className="font-medium text-gray-500">{projectData.tasks.noAssignment}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">No Due Date</span>
                    <span className="font-medium text-yellow-600">{projectData.tasks.noDueDate}</span>
                  </div>
                </div>
              </div>

              {/* Team Activity Score Card */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Team Activity</h3>
                  <select className="text-sm font-medium text-gray-500 border-none bg-transparent focus:ring-0 py-0 pr-8">
                    <option>Deze week</option>
                    <option>Vorige week</option>
                    <option>Deze maand</option>
                  </select>
                </div>

                {/* Podium / #1 Performer */}
                <div className="mb-4">
                  <div 
                    className="flex items-center gap-4 p-3 rounded-lg bg-indigo-50 border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => setSelectedTeamMember(teamActivityData[0])}
                  >
                    <div className="relative">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold ${teamActivityData[0].avatarBg}`}>
                        {teamActivityData[0].avatar}
                      </div>
                      <span className="absolute -top-2 -right-2 text-xl">🏆</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">{teamActivityData[0].name}</span>
                        <span className="font-bold text-indigo-600 text-lg">{teamActivityData[0].score}</span>
                      </div>
                      <div className="bg-indigo-200 w-full h-1.5 rounded-full mt-1">
                        <div 
                          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${(teamActivityData[0].score / Math.max(...teamActivityData.map(u => u.score), 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rest of the team in a scrollable list */}
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {teamActivityData.slice(1).map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedTeamMember(user)}
                    >
                      <span className="text-sm font-medium text-gray-400 w-5 text-center">{index + 2}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${user.avatarBg}`}>
                        {user.avatar}
                      </div>
                      <span className="flex-grow font-semibold text-gray-700 text-sm">{user.name}</span>
                      <span className="font-bold text-gray-600 text-sm">{user.score}</span>
                    </div>
                  ))}
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
                    <circle cx="96" cy="96" r="80" stroke="#E5E7EB" strokeWidth="20" fill="none" />
                    
                    {/* In Progress - Green */}
                    <circle cx="96" cy="96" r="80" stroke="#10B981" strokeWidth="20" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 80 * (projectData.tasks.inProgress / projectData.tasks.total)} ${2 * Math.PI * 80}`} 
                      strokeDashoffset="0" />
                    
                    {/* Overdue - Red */}
                    <circle cx="96" cy="96" r="80" stroke="#EF4444" strokeWidth="20" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 80 * (projectData.tasks.overdue / projectData.tasks.total)} ${2 * Math.PI * 80}`} 
                      strokeDashoffset={`-${2 * Math.PI * 80 * (projectData.tasks.inProgress / projectData.tasks.total)}`} />
                    
                    {/* No Assignment - Gray */}
                    <circle cx="96" cy="96" r="80" stroke="#9CA3AF" strokeWidth="20" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 80 * (projectData.tasks.noAssignment / projectData.tasks.total)} ${2 * Math.PI * 80}`} 
                      strokeDashoffset={`-${2 * Math.PI * 80 * ((projectData.tasks.inProgress + projectData.tasks.overdue) / projectData.tasks.total)}`} />
                    
                    {/* No Due Date - Yellow */}
                    <circle cx="96" cy="96" r="80" stroke="#F59E0B" strokeWidth="20" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 80 * (projectData.tasks.noDueDate / projectData.tasks.total)} ${2 * Math.PI * 80}`} 
                      strokeDashoffset={`-${2 * Math.PI * 80 * ((projectData.tasks.inProgress + projectData.tasks.overdue + projectData.tasks.noAssignment) / projectData.tasks.total)}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{Math.round((projectData.tasks.inProgress / projectData.tasks.total) * 100)}%</div>
                      <div className="text-sm text-gray-600">On Track</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">In Progress</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{projectData.tasks.inProgress}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Overdue</span>
                  </div>
                  <span className="text-sm font-bold text-red-600">{projectData.tasks.overdue}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">No Assignment</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600">{projectData.tasks.noAssignment}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">No Due Date</span>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">{projectData.tasks.noDueDate}</span>
                </div>
              </div>
            </div>

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

      {/* Team Member Details Modal */}
      {selectedTeamMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedTeamMember(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${selectedTeamMember.avatarBg}`}>
                  {selectedTeamMember.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedTeamMember.name}</h3>
                  <p className="text-sm text-gray-500">Score-details</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeamMember(null)}
                className="text-2xl leading-none text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div className="flex justify-between">
                <span>✅ Taken voltooid</span>
                <span className="font-semibold text-green-600">+{selectedTeamMember.details.completed}</span>
              </div>
              <div className="flex justify-between">
                <span>🚧 In progress</span>
                <span className="font-semibold text-blue-600">+{selectedTeamMember.details.progress}</span>
              </div>
              <div className="flex justify-between">
                <span>💬 Updates</span>
                <span className="font-semibold text-blue-600">+{selectedTeamMember.details.updates}</span>
              </div>
              <div className="flex justify-between">
                <span>🗓️ Op tijd</span>
                <span className="font-semibold text-green-600">+{selectedTeamMember.details.inTime}</span>
              </div>
              <div className="flex justify-between">
                <span>⚠️ Te laat</span>
                <span className="font-semibold text-red-600">{selectedTeamMember.details.overdue}</span>
              </div>
              <div className="flex justify-between">
                <span>❌ Geen datum</span>
                <span className="font-semibold text-orange-600">{selectedTeamMember.details.noDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-medium text-green-600">{projectData.tasks.inProgress}</span>
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
          initialType={createPopupType}
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