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
import PersonalDashboard from './pages/PersonalDashboard';

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
  Dashboard: PersonalDashboard,
  SalesOverview
};



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