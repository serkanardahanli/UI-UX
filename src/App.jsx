import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Coffee, Briefcase, Home, Plane, Heart, CheckCircle2, Circle, AlertCircle, ArrowRight, Plus, ChevronRight, Bell, MessageSquare, Gift, FileText, Send, Smile, MapPin, Target, TrendingUp, Cake, PartyPopper, Star, BarChart3, X, Check, LayoutDashboard, FolderKanban, Inbox, CheckSquare, Layers, Search, Settings, User, Grid3X3, List } from 'lucide-react';
import ProjectOverview from './pages/ProjectOverview';
import InboxDashboard from './pages/InboxDashboard';
import TaskDashboard from './pages/TaskDashboard';
import SubtaskSidebar from './pages/SubtaskSidebar';
import SubtaakPage from './pages/SubtaakPage';
import CalendarPage from './pages/CalendarPage';
import TaskBoardView from './pages/TaskBoardView';
import TaskListView from './pages/TaskListView';
import CreateTaskActivity from './components/CreateTaskActivity';
import HummyAgent from './components/HummyAgent';
import CancelSubscriptionFlow from './pages/CancelSubscriptionFlow';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'projects', 'inbox', 'tasks', 'subtask', 'subtaak', 'calendar', 'board', 'list', or 'cancel-subscription'
  const [showSubtaskSidebar, setShowSubtaskSidebar] = useState(false);
  
  if (currentView === 'projects') {
    return <ProjectOverview setCurrentView={setCurrentView} />;
  }
  
  if (currentView === 'inbox') {
    return <InboxDashboard setCurrentView={setCurrentView} />;
  }
  
  if (currentView === 'tasks') {
    return <TaskDashboard setCurrentView={setCurrentView} />;
  }
  
  if (currentView === 'board') {
    return <TaskBoardView setCurrentView={setCurrentView} />;
  }
  
  if (currentView === 'list') {
    return <TaskListView setCurrentView={setCurrentView} />;
  }
  
  if (currentView === 'subtaak') {
    return <SubtaakPage />;
  }
  
  if (currentView === 'cancel-subscription') {
    return <CancelSubscriptionFlow setCurrentView={setCurrentView} />;
  }
  
  if (currentView === 'subtask') {
    return (
      <div className="relative">
        <PersonalDashboard setCurrentView={setCurrentView} currentView={currentView} />
        <SubtaskSidebar />
      </div>
    );
  }

  if (currentView === 'calendar') {
    return <CalendarPage />;
  }

  return (
    <div className="relative">
      <PersonalDashboard setCurrentView={setCurrentView} currentView={currentView} setShowSubtaskSidebar={setShowSubtaskSidebar} />
      {showSubtaskSidebar && <SubtaskSidebar />}
    </div>
  );
}

function PersonalDashboard({ setCurrentView, currentView = 'dashboard', setShowSubtaskSidebar }) {
  const [currentStatus, setCurrentStatus] = useState('focus');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showQuickMessage, setShowQuickMessage] = useState(false);
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [quickMessage, setQuickMessage] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [createPopupType, setCreatePopupType] = useState('');
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const userData = {
    name: 'Serkan Ardahanli',
    role: 'Product Manager',
    avatar: 'SA',
    currentTime: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    currentDate: currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  };

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const statusOptions = [
    { value: 'office', label: 'In Office', icon: Briefcase, color: 'text-green-600' },
    { value: 'remote', label: 'Working Remote', icon: Home, color: 'text-blue-600' },
    { value: 'meeting', label: 'In a Meeting', icon: Users, color: 'text-yellow-600' },
    { value: 'focus', label: 'Focus Time', icon: Target, color: 'text-purple-600' },
    { value: 'lunch', label: 'Lunch Break', icon: Coffee, color: 'text-orange-600' },
    { value: 'vacation', label: 'On Vacation', icon: Plane, color: 'text-indigo-600' },
    { value: 'sick', label: 'Sick Leave', icon: Heart, color: 'text-red-600' }
  ];

  const mySchedule = [
    {
      time: '09:00',
      title: 'Sprint Planning',
      type: 'meeting',
      module: 'Projects',
      duration: '1h',
      priority: 'high',
      attendees: ['Emma Wilson', 'Michael Chen'],
      location: 'Meeting Room A'
    },
    {
      time: '10:30',
      title: 'Review client proposal',
      type: 'task',
      module: 'CRM',
      client: 'Google Netherlands',
      priority: 'high'
    },
    {
      time: '11:00',
      title: 'Call Sarah from TechCorp',
      type: 'call',
      module: 'Sales',
      duration: '30m',
      phone: '+31 6 12345678'
    },
    {
      time: '12:30',
      title: 'Lunch with MT',
      type: 'lunch',
      location: 'Restaurant De Kas',
      attendees: ['Alex Morgan', 'Lisa Park']
    },
    {
      time: '14:00',
      title: 'UI/UX Review',
      type: 'review',
      module: 'Projects',
      priority: 'medium'
    },
    {
      time: '16:00',
      title: 'Team Coffee & Catch-up',
      type: 'social',
      location: 'Kitchen Area'
    }
  ];

  const teamMembers = [
    { 
      name: 'Emma Wilson', 
      role: 'UI/UX Designer', 
      avatar: 'EW', 
      color: 'bg-blue-500',
      status: 'office',
      currentTask: 'Designing dashboard v2',
      available: true
    },
    { 
      name: 'Michael Chen', 
      role: 'Frontend Developer', 
      avatar: 'MC', 
      color: 'bg-purple-500',
      status: 'remote',
      currentTask: 'API integration',
      available: true
    },
    { 
      name: 'Sarah Johnson', 
      role: 'Marketing Manager', 
      avatar: 'SJ', 
      color: 'bg-green-500',
      status: 'meeting',
      currentTask: 'Client presentation',
      available: false,
      busyUntil: '11:00'
    },
    { 
      name: 'Alex Morgan', 
      role: 'Sales Director', 
      avatar: 'AM', 
      color: 'bg-orange-500',
      status: 'office',
      currentTask: 'Q3 planning',
      available: true
    },
    { 
      name: 'Lisa Park', 
      role: 'HR Manager', 
      avatar: 'LP', 
      color: 'bg-pink-500',
      status: 'office',
      currentTask: 'Recruitment interviews',
      available: true,
      birthday: 'tomorrow'
    },
    { 
      name: 'Tom Anderson', 
      role: 'Finance Manager', 
      avatar: 'TA', 
      color: 'bg-indigo-500',
      status: 'focus',
      currentTask: 'Budget review',
      available: false,
      busyUntil: '12:00'
    }
  ];

  const modules = [
    { name: 'Projects', icon: BarChart3, count: 8, new: 2, trend: '+12%', color: 'text-purple-600' },
    { name: 'CRM', icon: Users, count: 156, new: 5, trend: '+8%', color: 'text-blue-600' },
    { name: 'Sales', icon: TrendingUp, count: 23, new: 0, trend: '+15%', color: 'text-green-600' },
    { name: 'Support', icon: MessageSquare, count: 12, new: 3, trend: '-5%', color: 'text-orange-600' },
    { name: 'Marketing', icon: Target, count: 7, new: 1, trend: '+22%', color: 'text-pink-600' },
    { name: 'Docs', icon: FileText, count: 89, new: 0, trend: '0%', color: 'text-indigo-600' }
  ];

  const companyEvents = [
    {
      title: 'Summer BBQ',
      date: 'July 15',
      type: 'social',
      description: 'Annual team BBQ at Vondelpark',
      icon: Coffee
    },
    {
      title: 'New Office Opening',
      date: 'June 2',
      type: 'announcement',
      description: 'Amsterdam Zuid location',
      icon: Briefcase
    },
    {
      title: 'Q2 All Hands',
      date: 'June 28',
      type: 'meeting',
      description: 'Quarterly company meeting',
      icon: Users
    }
  ];

  const upcomingBirthdays = [
    { name: 'Lisa Park', date: 'Tomorrow', avatar: 'LP', role: 'HR Manager' },
    { name: 'Tom Anderson', date: 'June 2', avatar: 'TA', role: 'Finance' },
    { name: 'Maria Garcia', date: 'June 5', avatar: 'MG', role: 'Support' }
  ];

  const myTasks = [
    { id: 1, title: 'Complete project proposal', due: 'Today', priority: 'high' },
    { id: 2, title: 'Review Q3 budget', due: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Update team on progress', due: 'This week', priority: 'low' }
  ];

  // Helper functions
  const toggleTask = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const addNewTask = () => {
    if (newTaskTitle.trim()) {
      // In a real app, this would add to a database
      console.log('Adding task:', newTaskTitle);
      setNewTaskTitle('');
      setShowNewTaskForm(false);
      showToastNotification('Task added successfully!');
    }
  };

  const sendQuickMessage = () => {
    if (quickMessage.trim() && selectedTeammate) {
      // In a real app, this would send the message
      console.log(`Sending message to ${selectedTeammate.name}: ${quickMessage}`);
      setQuickMessage('');
      setShowQuickMessage(false);
      setSelectedTeammate(null);
      showToastNotification('Message sent successfully!');
    }
  };

  const markNotificationAsRead = () => {
    if (notifications > 0) {
      setNotifications(notifications - 1);
    }
  };

  // Simple calendar component
  const renderCalendar = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                      selectedDate.getMonth() === new Date().getMonth();
      const hasEvent = [5, 12, 15, 22, 28].includes(day); // Example event days
      
      days.push(
        <button
          key={day}
          className={`p-2 text-sm rounded-lg hover:bg-gray-50 transition-colors relative ${
            isToday ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-700'
          }`}
        >
          {day}
          {hasEvent && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full"></div>
          )}
        </button>
      );
    }
    
    return days;
  };

  const currentStatusOption = statusOptions.find(s => s.value === currentStatus);
  const StatusIcon = currentStatusOption.icon;

  const handleQuickMessage = (teammate) => {
    setSelectedTeammate(teammate);
    setShowQuickMessage(true);
  };

  // Show toast notification
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000);
  };

  // Open create popup
  const openCreatePopup = (type = '') => {
    setCreatePopupType(type);
    setShowCreatePopup(true);
  };

  // Close create popup
  const closeCreatePopup = () => {
    setShowCreatePopup(false);
    setCreatePopupType('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <nav className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 160 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M88.6835 91.2495L73.1997 138.097L60.5294 109.394L88.6835 91.2495Z" fill="#9280FF"/>
                <path d="M20 18L111.115 76.7578L88.684 91.2493L43.4762 70.9974L20 18Z" fill="#C449FF"/>
                <path d="M75.7774 46.6198L98.6931 61.3377L103.579 46.7534L140 50.1347L86.6946 26.2973L75.7774 46.6198Z" fill="#9280FF"/>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'dashboard'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('projects')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'projects'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                Projects
              </button>
              <button
                onClick={() => setCurrentView('inbox')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'inbox'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Inbox className="w-4 h-4" />
                Inbox
              </button>
              <button
                onClick={() => setCurrentView('tasks')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'tasks'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Tasks
              </button>
              <button
                onClick={() => setCurrentView('subtaak')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'subtaak'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                Subtaak
              </button>
              <button
                onClick={() => setCurrentView('calendar')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'calendar'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Calendar
              </button>
              <button
                onClick={() => setCurrentView('board')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'board'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Board
              </button>
              <button
                onClick={() => setCurrentView('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'list'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
              <button
                onClick={() => setCurrentView('cancel-subscription')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'cancel-subscription'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <X className="w-4 h-4" />
                Cancel Subscription
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {userData.avatar}
                </div>
                <div>
                  <h1 className="text-xl font-medium text-gray-900">
                    {greeting()}, {userData.name.split(' ')[0]}
                  </h1>
                  <p className="text-sm text-gray-500">{userData.currentDate}</p>
                </div>
              </div>
              
              {/* Status */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    currentStatus === 'focus' 
                      ? 'bg-purple-50 border border-purple-200 text-purple-700' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="relative">
                    <StatusIcon className="w-4 h-4" />
                    {currentStatus === 'focus' && (
                      <div className="absolute -inset-1 bg-purple-400 rounded-full animate-ping opacity-30"></div>
                    )}
                  </div>
                  <span>{currentStatusOption.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showStatusDropdown ? 'rotate-90' : ''}`} />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in-0 zoom-in-95 duration-200">
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setCurrentStatus(option.value);
                            setShowStatusDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                            currentStatus === option.value ? 'text-gray-900 bg-gray-50' : 'text-gray-600'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${option.color}`} />
                          <span>{option.label}</span>
                          {currentStatus === option.value && (
                            <Check className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {userData.currentTime}
              </div>
              <button className="relative">
                <Bell size={20} className="text-gray-600 hover:text-gray-800" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                {userData.initials}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Columns */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Team & Social */}
          <div className="col-span-3 space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Team</h3>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
                    {teamMembers.filter(m => m.available).length} available
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {teamMembers.map((member, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative">
                        <div className={`w-9 h-9 ${member.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                          {member.avatar}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          member.available ? 'bg-green-400' : 'bg-gray-300'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-900">{member.name.split(' ')[0]}</h4>
                          {member.birthday && (
                            <Gift className="w-3.5 h-3.5 text-purple-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {member.available ? member.currentTask : `Busy until ${member.busyUntil}`}
                        </p>
                      </div>
                      {member.available && (
                        <button 
                          onClick={() => handleQuickMessage(member)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Birthdays */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <Cake className="w-4 h-4 text-purple-600" />
                <h3 className="font-medium text-gray-900 text-sm">Birthdays</h3>
              </div>
              <div className="space-y-2">
                {upcomingBirthdays.map((birthday, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-medium text-purple-600 border border-purple-200">
                        {birthday.avatar}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{birthday.name}</p>
                        <p className="text-xs text-gray-500">{birthday.role}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-purple-600">{birthday.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-100 p-4">
              <h3 className="font-medium text-gray-900 text-sm mb-3">This Week</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tasks completed</span>
                  <span className="font-medium text-gray-900">{completedTasks.size + 15}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meetings</span>
                  <span className="font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Productivity</span>
                  <span className="font-medium text-green-600">+{Math.round((completedTasks.size / myTasks.length) * 100) || 8}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - My Focus */}
          <div className="col-span-6 space-y-6">
            {/* My Day */}
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">My Day</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{mySchedule.length} items</span>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Open calendar
                    </button>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {mySchedule.map((item, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-900">{item.time}</span>
                        {item.duration && (
                          <span className="text-xs text-gray-500">{item.duration}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              {item.module && (
                                <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded">
                                  {item.module}
                                </span>
                              )}
                              {item.location && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {item.location}
                                </span>
                              )}
                              {item.attendees && (
                                <span className="text-xs text-gray-500">
                                  with {item.attendees.length} others
                                </span>
                              )}
                              {item.client && (
                                <span className="text-xs text-gray-500">{item.client}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.priority && (
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                item.priority === 'high' 
                                  ? 'bg-red-50 text-red-600' 
                                  : 'bg-yellow-50 text-yellow-600'
                              }`}>
                                {item.priority}
                              </span>
                            )}
                            <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Tasks */}
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Focus Tasks</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    View all
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {myTasks.map((task, i) => (
                  <div key={task.id} className={`flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors ${completedTasks.has(task.id) ? 'opacity-60' : ''}`}>
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                        completedTasks.has(task.id) 
                          ? 'bg-purple-500 border-purple-500 text-white' 
                          : 'border-gray-300 hover:border-purple-500'
                      }`}
                    >
                      {completedTasks.has(task.id) && <Check className="w-3 h-3" />}
                    </button>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${completedTasks.has(task.id) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500">Due {task.due}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      task.priority === 'high' 
                        ? 'bg-red-50 text-red-600' 
                        : task.priority === 'medium'
                        ? 'bg-yellow-50 text-yellow-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
                
                {showNewTaskForm ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-purple-500 focus:outline-none"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                    />
                    <button
                      onClick={addNewTask}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setShowNewTaskForm(false);
                        setNewTaskTitle('');
                      }}
                      className="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowNewTaskForm(true)}
                    className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add task
                  </button>
                )}
              </div>
            </div>

            {/* Modules Grid */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quick Access</h3>
              <div className="grid grid-cols-3 gap-3">
                {modules.map((module, i) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={i}
                      className="bg-white rounded-lg border border-gray-100 p-4 hover:border-purple-200 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-purple-50 transition-colors`}>
                          <Icon className={`w-5 h-5 ${module.color} transition-colors`} />
                        </div>
                        <span className={`text-xs font-medium ${
                          module.trend.startsWith('+') ? 'text-green-600' : 
                          module.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {module.trend}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 text-left">{module.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{module.count} items</span>
                        {module.new > 0 && (
                          <span className="text-xs text-purple-600 font-medium">+{module.new}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Calendar & Events */}
          <div className="col-span-3 space-y-6">
            {/* Mini Calendar */}
            <div className="bg-white rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400 rotate-180" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>

            {/* Company Events */}
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <PartyPopper className="w-4 h-4 text-purple-600" />
                  <h3 className="font-medium text-gray-900">Company Events</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {companyEvents.map((event, i) => {
                  const Icon = event.icon;
                  return (
                    <div key={i} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                          <Icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                            <span className="text-xs text-purple-600 font-medium">{event.date}</span>
                          </div>
                          <p className="text-xs text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Latest Announcement */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-50/30 rounded-lg p-4 border border-purple-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">FlowQi 3.0 Launch Success!</h4>
                  <p className="text-xs text-gray-600 mb-2">
                    Thanks to everyone's hard work, we successfully launched version 3.0. Celebration drinks Friday at 17:00!
                  </p>
                  <p className="text-xs text-gray-500">Posted 2 hours ago</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => openCreatePopup('task')}
                className="flex-1 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Task
              </button>
              <button 
                onClick={() => openCreatePopup('activity')}
                className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Create Activity
              </button>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => openCreatePopup()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New
              </button>
              <button 
                onClick={() => setShowSubtaskSidebar && setShowSubtaskSidebar(true)}
                className="flex-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                View Subtask
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Message Modal */}
      {showQuickMessage && selectedTeammate && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-in fade-in-0 duration-200">
          <div className="bg-white rounded-lg w-96 max-w-full mx-4 shadow-xl animate-in zoom-in-95 fade-in-0 duration-200">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${selectedTeammate.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                    {selectedTeammate.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedTeammate.name}</h3>
                    <p className="text-xs text-gray-500">{selectedTeammate.currentTask}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowQuickMessage(false);
                    setQuickMessage('');
                    setSelectedTeammate(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea 
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                rows="3"
                placeholder="Type your message..."
                autoFocus
              />
              <div className="flex items-center justify-between mt-3">
                <button className="text-gray-400 hover:text-gray-600">
                  <Smile className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowQuickMessage(false)}
                    className="px-4 py-2 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={sendQuickMessage}
                    disabled={!quickMessage.trim()}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                      quickMessage.trim() 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task/Activity Popup */}
      <CreateTaskActivity 
        isOpen={showCreatePopup}
        onClose={closeCreatePopup}
        initialType={createPopupType}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in-0 duration-300">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{toastMessage}</p>
              </div>
              <button 
                onClick={() => {
                  setShowToast(false);
                  setToastMessage('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Hummy Agent */}
      <HummyAgent />
    </div>
  );
}