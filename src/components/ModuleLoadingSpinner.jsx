// 🔄 Module Loading States
// Professional loading components for dynamic module loading

import React from 'react';
import { Loader2, Coffee, Zap } from 'lucide-react';

// 🎭 Main module loading component
export const ModuleLoadingSpinner = ({ 
  moduleName, 
  variant = 'default',
  showModuleName = true,
  delay = 200 
}) => {
  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    // Add delay to prevent flash for fast-loading modules
    const timer = setTimeout(() => setShowLoader(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!showLoader) return null;

  const variants = {
    default: {
      container: 'flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg',
      spinner: 'w-8 h-8 text-purple-600',
      text: 'text-gray-600'
    },
    minimal: {
      container: 'flex items-center justify-center p-8',
      spinner: 'w-5 h-5 text-purple-600',
      text: 'text-gray-500 text-sm'
    },
    fullscreen: {
      container: 'fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50',
      spinner: 'w-12 h-12 text-purple-600',
      text: 'text-gray-700 text-lg'
    },
    card: {
      container: 'flex items-center justify-center min-h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm',
      spinner: 'w-6 h-6 text-purple-600',
      text: 'text-gray-600 text-sm'
    }
  };

  const style = variants[variant] || variants.default;

  return (
    <div className={style.container}>
      <div className="text-center">
        <div className="relative mb-4">
          {/* Main spinner */}
          <Loader2 className={`${style.spinner} animate-spin mx-auto`} />
          
          {/* Optional accent animation */}
          {variant === 'default' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
            </div>
          )}
        </div>
        
        {showModuleName && (
          <div className={style.text}>
            Loading {moduleName ? `${moduleName} module` : 'module'}...
          </div>
        )}
        
        {variant === 'default' && (
          <div className="text-xs text-gray-400 mt-2">
            ⚡ Optimizing for better performance
          </div>
        )}
      </div>
    </div>
  );
};

// 🎯 Skeleton loader for specific module types
export const ModuleSkeleton = ({ type = 'dashboard', className = '' }) => {
  const skeletons = {
    dashboard: (
      <div className={`space-y-6 p-6 ${className}`}>
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* Content area */}
        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    
    list: (
      <div className={`space-y-4 p-6 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-7 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        
        {/* List items */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    board: (
      <div className={`p-6 ${className}`}>
        <div className="grid grid-cols-3 gap-6">
          {['To Do', 'In Progress', 'Done'].map((title, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(j => (
                  <div key={j} className="bg-white p-3 rounded-lg border border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return skeletons[type] || skeletons.dashboard;
};

// 🎪 Fun loading messages
export const LoadingMessages = ({ moduleName }) => {
  const messages = [
    { icon: <Coffee className="w-4 h-4" />, text: "Brewing your workspace..." },
    { icon: <Zap className="w-4 h-4" />, text: "Charging up the interface..." },
    { icon: <Loader2 className="w-4 h-4 animate-spin" />, text: "Assembling components..." }
  ];

  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const message = messages[currentMessage];

  return (
    <div className="flex items-center gap-2 text-purple-600 text-sm">
      {message.icon}
      <span>{message.text}</span>
    </div>
  );
};

// 🔄 Progress bar for module loading
export const ModuleLoadingProgress = ({ progress = 0, moduleName }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          Loading {moduleName}...
        </span>
        <span className="text-sm text-purple-600 font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ModuleLoadingSpinner;