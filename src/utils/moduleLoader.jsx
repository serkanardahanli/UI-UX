// 🚀 Dynamic Module Loader
// Handles lazy loading of modules with error boundaries and loading states

import { lazy } from 'react';

// 📦 Lazy loaded components with proper error handling
const createLazyComponent = (importFn, fallbackComponent = null) => {
  return lazy(async () => {
    try {
      const module = await importFn();
      return module;
    } catch (error) {
      console.error('Failed to load module:', error);
      
      // Return a fallback component if provided
      if (fallbackComponent) {
        return { default: fallbackComponent };
      }
      
      // Return a generic error component
      return {
        default: () => (
          <div className="flex items-center justify-center min-h-[400px] bg-red-50 rounded-lg m-4">
            <div className="text-center">
              <div className="text-red-600 text-xl mb-2">⚠️</div>
              <h3 className="text-lg font-medium text-red-800 mb-1">Module Failed to Load</h3>
              <p className="text-red-600 text-sm">Please refresh the page or contact support</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      };
    }
  });
};

// 🎯 Centralized lazy component registry
export const lazyComponents = {
  // Dashboard Module
  PersonalDashboard: createLazyComponent(() => 
    Promise.resolve({ default: () => <div>Dashboard loading...</div> })
  ),
  
  // Project Management Module
  ProjectOverview: createLazyComponent(() => 
    import('../pages/ProjectOverview')
  ),
  TaskBoardView: createLazyComponent(() => 
    import('../pages/TaskBoardView')
  ),
  CalendarPage: createLazyComponent(() => 
    import('../pages/CalendarPage')
  ),
  
  // Communication Module
  InboxDashboard: createLazyComponent(() => 
    import('../pages/InboxDashboard')
  ),
  
  // Task Management Module
  TaskDashboard: createLazyComponent(() => 
    import('../pages/TaskDashboard')
  ),
  TaskListView: createLazyComponent(() => 
    import('../pages/TaskListView')
  ),
  SubtaakPage: createLazyComponent(() => 
    import('../pages/SubtaakPage')
  ),
  SubtaskSidebar: createLazyComponent(() => 
    import('../pages/SubtaskSidebar')
  ),
  
  // Commerce Module
  AddProducts: createLazyComponent(() => 
    import('../pages/AddProducts')
  ),
  AddPaymentMethod: createLazyComponent(() => 
    import('../pages/AddPaymentMethod')
  ),
  
  // Settings Module
  CancelSubscriptionFlow: createLazyComponent(() => 
    import('../pages/CancelSubscriptionFlow')
  ),
  
  // Shared Components
  CreateTaskActivity: createLazyComponent(() => 
    import('../components/CreateTaskActivity')
  ),
  HummyAgent: createLazyComponent(() => 
    import('../components/HummyAgent')
  ),
  ModularNavigation: createLazyComponent(() => 
    import('../components/ModularNavigation')
  )
};

// 📊 Module loading analytics
export const moduleLoadingStats = {
  loadTimes: new Map(),
  errorCounts: new Map(),
  
  recordLoadTime: (moduleName, startTime) => {
    const loadTime = Date.now() - startTime;
    moduleLoadingStats.loadTimes.set(moduleName, loadTime);
    console.log(`Module ${moduleName} loaded in ${loadTime}ms`);
  },
  
  recordError: (moduleName, error) => {
    const currentCount = moduleLoadingStats.errorCounts.get(moduleName) || 0;
    moduleLoadingStats.errorCounts.set(moduleName, currentCount + 1);
    console.error(`Module ${moduleName} error count: ${currentCount + 1}`, error);
  },
  
  getStats: () => ({
    loadTimes: Object.fromEntries(moduleLoadingStats.loadTimes),
    errorCounts: Object.fromEntries(moduleLoadingStats.errorCounts)
  })
};

// 🔄 Preload specific modules based on user role and usage patterns
export const preloadModules = async (userRole = 'user', priority = 'high') => {
  const highPriorityModules = ['TaskDashboard', 'InboxDashboard', 'ProjectOverview'];
  const mediumPriorityModules = ['TaskListView', 'CalendarPage'];
  
  const modulesToPreload = priority === 'high' 
    ? highPriorityModules 
    : [...highPriorityModules, ...mediumPriorityModules];
  
  const preloadPromises = modulesToPreload.map(async (moduleName) => {
    try {
      const startTime = Date.now();
      await lazyComponents[moduleName];
      moduleLoadingStats.recordLoadTime(moduleName, startTime);
    } catch (error) {
      moduleLoadingStats.recordError(moduleName, error);
    }
  });
  
  return Promise.allSettled(preloadPromises);
};

// 🎯 Get component by name with automatic loading
export const getComponent = (componentName) => {
  const component = lazyComponents[componentName];
  
  if (!component) {
    console.warn(`Component "${componentName}" not found in lazy registry`);
    return lazyComponents.ErrorComponent || (() => <div>Component not found</div>);
  }
  
  return component;
};

// 🔧 Module loading utilities
export const moduleUtils = {
  // Check if a module is already loaded
  isModuleLoaded: (moduleName) => {
    return moduleLoadingStats.loadTimes.has(moduleName);
  },
  
  // Get module loading performance
  getModulePerformance: (moduleName) => {
    return {
      loadTime: moduleLoadingStats.loadTimes.get(moduleName),
      errorCount: moduleLoadingStats.errorCounts.get(moduleName) || 0,
      isLoaded: moduleLoadingStats.loadTimes.has(moduleName)
    };
  },
  
  // Clear module cache (useful for development)
  clearModuleCache: () => {
    moduleLoadingStats.loadTimes.clear();
    moduleLoadingStats.errorCounts.clear();
  }
};