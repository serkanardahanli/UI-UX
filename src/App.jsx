import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Coffee, Briefcase, Home, Plane, Heart, CheckCircle2, Circle, AlertCircle, ArrowRight, Plus, ChevronRight, Bell, MessageSquare, Gift, FileText, Send, Smile, MapPin, Target, TrendingUp, Cake, PartyPopper, Star, BarChart3, X, Check, LayoutDashboard, FolderKanban, Inbox, CheckSquare, Layers, Search, Settings, User, Grid3X3, List, ShoppingCart, CreditCard } from 'lucide-react';
import ProjectOverview from './pages/ProjectOverview';
import InboxDashboard from './pages/InboxDashboard';
import TaskDashboard from './pages/TaskDashboard';
import SubtaskSidebar from './pages/SubtaskSidebar';
import SubtaakPage from './pages/SubtaakPage';
import CalendarPage from './pages/CalendarPage';
import TaskBoardView from './pages/TaskBoardView';
import TaskListView from './pages/TaskListView';
import SalesOverview from './pages/SalesOverview';
import SalesListView from './pages/SalesListView';
import SalesBoardView from './pages/SalesBoardView';
import DealDetail from './pages/DealDetail';
import AdminPanel from './pages/AdminPanel';
import CreateTaskActivity from './components/CreateTaskActivity';
import HummyAgent from './components/HummyAgent';
import CancelSubscriptionFlow from './pages/CancelSubscriptionFlow';
import AddProducts from './pages/AddProducts';
import AddPaymentMethod from './pages/AddPaymentMethod';
import ModuleManager from './components/ModuleManager';
import modulesConfig from './config/modules.json';
import PipelineSettings from './pages/PipelineSettings';

// Placeholder components for missing components
const GanttView = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Gantt Chart</h1>
    <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
      <p className="text-gray-500">Gantt Chart view coming soon...</p>
    </div>
  </div>
);

const NotificationCenter = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Notifications</h1>
    <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
      <p className="text-gray-500">Notification center coming soon...</p>
    </div>
  </div>
);

const EventManager = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Event Manager</h1>
    <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
      <p className="text-gray-500">Event manager coming soon...</p>
    </div>
  </div>
);

const SystemSettings = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-semibold text-gray-900 mb-4">System Settings</h1>
    <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
      <p className="text-gray-500">System settings coming soon...</p>
    </div>
  </div>
);

// Component mapping for dynamic routing
const componentMap = {
  ProjectOverview,
  InboxDashboard,
  TaskDashboard,
  SubtaakPage,
  CalendarPage,
  TaskBoardView,
  TaskListView,
  SalesListView,
  AdminPanel,
  CancelSubscriptionFlow,
  AddProducts,
  AddPaymentMethod,
  GanttView,
  SalesBoardView,
  DealDetail,
  PipelineSettings,
  NotificationCenter,
  EventManager,
  SystemSettings,
  Dashboard: () => <PersonalDashboard />,
  SalesOverview
};

function PersonalDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
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

  const quickStats = [
    { label: 'Active Projects', value: 8, change: '+2 this week', color: 'text-blue-600' },
    { label: 'Pending Tasks', value: 23, change: '-5 from yesterday', color: 'text-orange-600' },
    { label: 'Team Members', value: 12, change: 'All available', color: 'text-green-600' },
    { label: 'Completed Today', value: 7, change: '+3 from yesterday', color: 'text-purple-600' }
  ];

  const recentActivity = [
    { 
      action: 'Updated project timeline', 
      target: 'FlowQi v3.0', 
      time: '2 minutes ago',
      type: 'project'
    },
    { 
      action: 'Completed task', 
      target: 'Review client proposal', 
      time: '15 minutes ago',
      type: 'task'
    },
    { 
      action: 'Meeting scheduled', 
      target: 'Sprint Planning', 
      time: '1 hour ago',
      type: 'calendar'
    },
    { 
      action: 'New message received', 
      target: 'From Emma Wilson', 
      time: '2 hours ago',
      type: 'inbox'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {greeting()}, {userData.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`text-xs font-medium ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                    activity.type === 'project' ? 'bg-blue-500' :
                    activity.type === 'task' ? 'bg-green-500' :
                    activity.type === 'calendar' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}>
                    {activity.type === 'project' ? 'P' :
                     activity.type === 'task' ? 'T' :
                     activity.type === 'calendar' ? 'C' : 'M'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-gray-600"> • {activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Create New Project
              </button>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Add Task
              </button>
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Schedule Meeting
              </button>
              <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Module Overview */}
      <div className="mt-8 bg-white rounded-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Available Modules</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modulesConfig.modules.slice(0, 8).map((module) => (
              <div key={module.id} className="p-4 border border-gray-100 rounded-lg hover:border-purple-200 hover:shadow-sm transition-all cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-1">{module.label}</h3>
                <p className="text-xs text-gray-500 mb-3">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{module.pages.length} pages</span>
                  <div className={`w-2 h-2 rounded-full bg-${module.color}-400`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState('/projects');
  const [userRole, setUserRole] = useState('admin');

  // Find the component for the current path
  const getCurrentComponent = () => {
    // Find the module and page for the current path
    const module = modulesConfig.modules.find(m => 
      m.pages.some(p => p.path === currentPath)
    );
    
    if (!module) return () => <div>Page not found</div>;
    
    const page = module.pages.find(p => p.path === currentPath);
    const Component = componentMap[page.component];
    
    if (!Component) return () => <div>Component not found</div>;
    
    return Component;
  };

  const handleNavigation = (path) => {
    setCurrentPath(path);
  };

  const CurrentComponent = getCurrentComponent();

  return (
    <ModuleManager 
      currentPath={currentPath}
      onNavigate={handleNavigation}
      userRole={userRole}
    >
      <CurrentComponent />
    </ModuleManager>
  );
}