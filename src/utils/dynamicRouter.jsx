// 🚀 Dynamic Router for Module Loading
// Advanced routing system with lazy loading, error boundaries, and performance optimization

import React, { Suspense } from 'react';
import { getModuleByPath, modules } from '../config/modules';
import { lazyComponents, moduleLoadingStats, preloadModules } from './moduleLoader';
import ModuleErrorBoundary from '../components/ModuleErrorBoundary';
import { ModuleLoadingSpinner, ModuleSkeleton } from '../components/ModuleLoadingSpinner';

// 🎯 Dynamic Route Component
export const DynamicRoute = ({ 
  path, 
  fallbackComponent = null,
  loadingVariant = 'default',
  enablePreloading = true,
  userRole = 'user'
}) => {
  const [isPreloading, setIsPreloading] = React.useState(false);
  
  // Get module information
  const moduleInfo = getModuleByPath(path);
  
  if (!moduleInfo) {
    console.warn(`No module found for path: ${path}`);
    return fallbackComponent || <div>Page not found</div>;
  }

  const { module, page } = moduleInfo;
  const ComponentName = page.component;
  const LazyComponent = page.lazyComponent || lazyComponents[ComponentName];

  // Preload related modules
  React.useEffect(() => {
    if (enablePreloading && !isPreloading) {
      setIsPreloading(true);
      preloadModules(userRole, 'medium').finally(() => {
        setIsPreloading(false);
      });
    }
  }, [enablePreloading, userRole, isPreloading]);

  // Track loading performance
  React.useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      moduleLoadingStats.recordLoadTime(ComponentName, startTime);
    };
  }, [ComponentName]);

  if (!LazyComponent) {
    console.error(`Lazy component not found for: ${ComponentName}`);
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-yellow-50 rounded-lg m-4">
        <div className="text-center">
          <div className="text-yellow-600 text-xl mb-2">⚠️</div>
          <h3 className="text-lg font-medium text-yellow-800 mb-1">Component Not Found</h3>
          <p className="text-yellow-600 text-sm">Module: {module.label}</p>
          <p className="text-yellow-600 text-sm">Component: {ComponentName}</p>
        </div>
      </div>
    );
  }

  // Determine loading component based on module type
  const getLoadingComponent = () => {
    if (loadingVariant === 'skeleton') {
      const skeletonType = module.id === 'tasks' ? 'list' : 
                          module.id === 'projects' && path.includes('board') ? 'board' : 
                          'dashboard';
      return <ModuleSkeleton type={skeletonType} />;
    }
    
    return (
      <ModuleLoadingSpinner 
        moduleName={module.label}
        variant={loadingVariant}
        showModuleName={true}
      />
    );
  };

  return (
    <ModuleErrorBoundary 
      moduleName={module.label}
      onNavigateHome={() => window.location.href = '/dashboard'}
    >
      <Suspense fallback={getLoadingComponent()}>
        <LazyComponent />
      </Suspense>
    </ModuleErrorBoundary>
  );
};

// 🔧 Enhanced Router Hook
export const useDynamicRouter = (initialView = 'dashboard') => {
  const [currentView, setCurrentView] = React.useState(initialView);
  const [viewHistory, setViewHistory] = React.useState([initialView]);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigateTo = React.useCallback(async (path) => {
    setIsLoading(true);
    
    try {
      // Add to history
      setViewHistory(prev => [...prev.slice(-9), path]); // Keep last 10 views
      
      // Update current view
      setCurrentView(path);
      
      // Track navigation
      console.log(`Navigating to: ${path}`);
      
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goBack = React.useCallback(() => {
    if (viewHistory.length > 1) {
      const previousView = viewHistory[viewHistory.length - 2];
      setViewHistory(prev => prev.slice(0, -1));
      setCurrentView(previousView);
    }
  }, [viewHistory]);

  const canGoBack = viewHistory.length > 1;

  return {
    currentView,
    navigateTo,
    goBack,
    canGoBack,
    isLoading,
    viewHistory
  };
};

// 🎯 Route Mapping Helper
export const createRouteMapping = (userRole = 'user') => {
  const routeMap = new Map();
  
  Object.values(modules).forEach(module => {
    module.pages.forEach(page => {
      // Check if user has access to this page
      if (page.roles.includes(userRole)) {
        const normalizedPath = page.path.replace('/', '') || 'dashboard';
        
        routeMap.set(normalizedPath, {
          module: module,
          page: page,
          component: page.lazyComponent || lazyComponents[page.component]
        });
      }
    });
  });
  
  return routeMap;
};

// 📊 Performance Monitor
export const useRoutePerformance = () => {
  const [performanceData, setPerformanceData] = React.useState({});
  
  React.useEffect(() => {
    const updatePerformance = () => {
      setPerformanceData(moduleLoadingStats.getStats());
    };
    
    // Update every 5 seconds
    const interval = setInterval(updatePerformance, 5000);
    updatePerformance(); // Initial update
    
    return () => clearInterval(interval);
  }, []);
  
  return performanceData;
};

// 🔄 Preload Strategy
export const useSmartPreloading = (userRole, currentModule) => {
  React.useEffect(() => {
    // Preload likely next modules based on current context
    const preloadStrategy = {
      dashboard: ['tasks', 'inbox', 'projects'],
      tasks: ['projects', 'dashboard'],
      projects: ['tasks', 'calendar'],
      inbox: ['tasks', 'dashboard'],
      calendar: ['tasks', 'projects']
    };
    
    const modulesToPreload = preloadStrategy[currentModule] || [];
    
    modulesToPreload.forEach(async (moduleId) => {
      try {
        const component = lazyComponents[moduleId];
        if (component) {
          await component;
        }
      } catch (error) {
        console.warn(`Failed to preload module: ${moduleId}`, error);
      }
    });
  }, [currentModule, userRole]);
};

export default DynamicRoute;