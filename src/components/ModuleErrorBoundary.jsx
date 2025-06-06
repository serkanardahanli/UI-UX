// 🛡️ Module Error Boundary
// Handles errors during module loading and rendering with recovery options

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import { moduleLoadingStats } from '../utils/moduleLoader';

class ModuleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger error UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Module Error Boundary caught an error:', error, errorInfo);
    
    // Record error in analytics
    if (this.props.moduleName) {
      moduleLoadingStats.recordError(this.props.moduleName, error);
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // Optional: Send error to logging service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = async () => {
    if (this.state.retryCount >= 3) {
      console.warn('Maximum retry attempts reached');
      return;
    }

    this.setState({ 
      isRetrying: true,
      retryCount: this.state.retryCount + 1 
    });

    // Wait a bit before retrying
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isRetrying: false
    });
  };

  handleGoHome = () => {
    if (this.props.onNavigateHome) {
      this.props.onNavigateHome();
    } else {
      // Fallback navigation
      window.location.href = '/';
    }
  };

  handleReportError = () => {
    const errorReport = {
      module: this.props.moduleName || 'Unknown',
      error: this.state.error?.message || 'Unknown error',
      stack: this.state.error?.stack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      retryCount: this.state.retryCount
    };

    // Create mailto link with error details
    const subject = encodeURIComponent(`FlowQi Module Error: ${this.props.moduleName}`);
    const body = encodeURIComponent(`Error Report:\n\n${JSON.stringify(errorReport, null, 2)}`);
    window.location.href = `mailto:support@flowqi.com?subject=${subject}&body=${body}`;
  };

  render() {
    if (this.state.hasError) {
      const { moduleName = 'Unknown Module' } = this.props;
      const canRetry = this.state.retryCount < 3;

      return (
        <div className="min-h-[400px] flex items-center justify-center bg-red-50 rounded-lg m-4">
          <div className="max-w-md w-full text-center p-6">
            
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            {/* Error Message */}
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Module Failed to Load
            </h2>
            
            <p className="text-red-600 mb-1">
              The <strong>{moduleName}</strong> module encountered an error
            </p>
            
            <p className="text-sm text-red-500 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>

            {/* Retry Information */}
            {this.state.retryCount > 0 && (
              <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-700">
                  Retry attempts: {this.state.retryCount}/3
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              
              {/* Retry Button */}
              {canRetry && (
                <button
                  onClick={this.handleRetry}
                  disabled={this.state.isRetrying}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    this.state.isRetrying
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${this.state.isRetrying ? 'animate-spin' : ''}`} />
                  {this.state.isRetrying ? 'Retrying...' : 'Try Again'}
                </button>
              )}

              {/* Go to Dashboard */}
              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go to Dashboard
              </button>

              {/* Report Error */}
              <button
                onClick={this.handleReportError}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <Mail className="w-4 h-4" />
                Report Error
              </button>
            </div>

            {/* Technical Details (Development Mode) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Technical Details
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded-lg text-xs font-mono text-gray-700 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </div>
              </details>
            )}

            {/* Helpful Tips */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
              <h4 className="font-medium text-blue-800 mb-2">💡 Troubleshooting Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Check your internet connection</li>
                <li>• Try refreshing the page</li>
                <li>• Clear your browser cache</li>
                <li>• Contact support if the issue persists</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 🎯 Higher-order component for wrapping modules with error boundary
export const withModuleErrorBoundary = (WrappedComponent, moduleName) => {
  return function ModuleWithErrorBoundary(props) {
    return (
      <ModuleErrorBoundary moduleName={moduleName}>
        <WrappedComponent {...props} />
      </ModuleErrorBoundary>
    );
  };
};

// 🔧 Hook for error boundary context
export const useModuleError = () => {
  const reportError = (error, moduleName) => {
    console.error(`Error in module ${moduleName}:`, error);
    
    // Record in analytics
    moduleLoadingStats.recordError(moduleName, error);
    
    // You could trigger a user notification here
    if (window.showToast) {
      window.showToast(`Error in ${moduleName} module. Please try refreshing.`, 'error');
    }
  };

  return { reportError };
};

export default ModuleErrorBoundary;