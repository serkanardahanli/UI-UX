import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Inbox, 
  Calendar, 
  ShoppingCart, 
  Settings,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Users,
  Bell,
  Search
} from 'lucide-react';
import modulesConfig from '../config/modules.json';

// Icon mapping for dynamic icon rendering
const iconMap = {
  LayoutDashboard,
  FolderKanban, 
  CheckSquare,
  Inbox,
  Calendar,
  ShoppingCart,
  Settings,
  TrendingUp
};

const ModuleManager = ({ 
  currentPath, 
  onNavigate, 
  userRole = 'admin',
  children 
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModules, setFilteredModules] = useState([]);

  // Check if user has access to a page
  const hasAccess = (pageRoles) => {
    if (pageRoles.includes('all')) return true;
    if (userRole === 'admin') return true;
    return pageRoles.includes(userRole);
  };

  // Filter modules based on user permissions
  useEffect(() => {
    const filtered = modulesConfig.modules.filter(module => {
      return module.pages.some(page => hasAccess(page.roles));
    }).map(module => ({
      ...module,
      pages: module.pages.filter(page => hasAccess(page.roles))
    }));
    
    setFilteredModules(filtered);
  }, [userRole]);

  // Search functionality
  const searchResults = filteredModules.filter(module => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      module.label.toLowerCase().includes(query) ||
      module.description.toLowerCase().includes(query) ||
      module.pages.some(page => 
        page.label.toLowerCase().includes(query)
      )
    );
  });

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const isCurrentPath = (path) => {
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  const getCurrentModule = () => {
    return filteredModules.find(module => 
      module.pages.some(page => isCurrentPath(page.path))
    );
  };

  const getCurrentPage = () => {
    const module = getCurrentModule();
    if (!module) return null;
    return module.pages.find(page => isCurrentPath(page.path));
  };

  const colorMap = {
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    slate: 'text-slate-600 bg-slate-50 border-slate-200',
    gray: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Module Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 160 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M88.6835 91.2495L73.1997 138.097L60.5294 109.394L88.6835 91.2495Z" fill="#9280FF"/>
              <path d="M20 18L111.115 76.7578L88.684 91.2493L43.4762 70.9974L20 18Z" fill="#C449FF"/>
              <path d="M75.7774 46.6198L98.6931 61.3377L103.579 46.7534L140 50.1347L86.6946 26.2973L75.7774 46.6198Z" fill="#9280FF"/>
            </svg>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">FlowQi</h1>
              <p className="text-xs text-gray-500">Modular Workspace</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Module Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {searchResults.map((module) => {
              const Icon = iconMap[module.icon];
              const isExpanded = expandedModules.has(module.id);
              const hasCurrentPage = module.pages.some(page => isCurrentPath(page.path));
              
              return (
                <div key={module.id} className="space-y-1">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      hasCurrentPage 
                        ? colorMap[module.color] || colorMap.purple
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{module.label}</span>
                      {module.pages.length > 1 && (
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {module.pages.length}
                        </span>
                      )}
                    </div>
                    {module.pages.length > 1 && (
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    )}
                  </button>

                  {/* Module Pages */}
                  {(isExpanded || module.pages.length === 1) && (
                    <div className="ml-6 space-y-1">
                      {module.pages.map((page) => (
                        <button
                          key={page.path}
                          onClick={() => onNavigate(page.path)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            isCurrentPath(page.path)
                              ? 'bg-purple-50 text-purple-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {page.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Module Stats */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Active Modules</span>
                <span>{filteredModules.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Pages</span>
                <span>{filteredModules.reduce((acc, m) => acc + m.pages.length, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Role</span>
                <span className="capitalize">{userRole}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              {getCurrentModule() && (
                <>
                  <span className="text-gray-500">{getCurrentModule().label}</span>
                  {getCurrentPage() && (
                    <>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{getCurrentPage().label}</span>
                    </>
                  )}
                </>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell size={20} className="text-gray-600 hover:text-gray-800" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  SA
                </div>
                <span className="text-sm font-medium text-gray-900">Serkan A.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModuleManager; 