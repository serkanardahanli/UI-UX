import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Lightbulb, RefreshCw, Undo2, HelpCircle } from 'lucide-react';

const HummyAgent = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTip, setCurrentTip] = useState(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isIdle, setIsIdle] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const idleTimeoutRef = useRef(null);
  const welcomeTimeoutRef = useRef(null);

  // Handle dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Sample tips based on context
  const tips = {
    welcome: {
      message: "Hi! I'm Hummy 👋 Your FlowQi assistant. Need help getting started?",
      type: "welcome",
      icon: <MessageCircle size={16} />
    },
    idle: {
      message: "Still with me? I'm here if you need help with anything!",
      type: "idle", 
      icon: <HelpCircle size={16} />
    },
    taskDeleted: {
      message: "Want to undo that? I can help restore your task.",
      type: "action",
      icon: <Undo2 size={16} />
    },
    formHelp: {
      message: "This form syncs with your CRM. Need help configuring it?",
      type: "help",
      icon: <Lightbulb size={16} />
    },
    error: {
      message: "Oops! Try refreshing your data. I'll help you sync it.",
      type: "error", 
      icon: <RefreshCw size={16} />
    }
  };

  // Handle user activity
  const resetIdleTimer = () => {
    setIsIdle(false);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      if (!isActive) {
        setCurrentTip(tips.idle);
        setIsActive(true);
      }
    }, 120000); // 2 minutes
  };

  // Trigger tips programmatically
  const showTip = (tipType) => {
    setCurrentTip(tips[tipType]);
    setIsActive(true);
    
    // Auto-hide after 5 seconds for non-welcome tips
    if (tipType !== 'welcome') {
      setTimeout(() => {
        setIsActive(false);
        setCurrentTip(null);
      }, 5000);
    }
  };

  useEffect(() => {
    // Show welcome message on mount
    if (showWelcome) {
      welcomeTimeoutRef.current = setTimeout(() => {
        showTip('welcome');
        setShowWelcome(false);
      }, 2000);
    }

    // Set up idle detection
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (welcomeTimeoutRef.current) clearTimeout(welcomeTimeoutRef.current);
    };
  }, [showWelcome]);

  const handleClose = () => {
    setIsActive(false);
    setCurrentTip(null);
  };

  return (
    <>
      {/* Hummy Agent */}
      <div
        className={`fixed z-40 transition-all duration-300 ease-out ${
          isIdle && !isActive ? 'opacity-20' : 'opacity-100'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Speech Bubble */}
        {isActive && currentTip && (
          <div className="absolute bottom-16 right-0 w-80 mb-4 animate-in slide-in-from-bottom-2 duration-300">
            <div className="relative bg-gradient-to-br from-purple-500/95 to-pink-500/95 backdrop-blur-sm text-white p-4 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-white/80 mt-0.5">
                  {currentTip.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{currentTip.message}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/60 hover:text-white/90 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-gradient-to-br from-purple-500/95 to-pink-500/95 rotate-45 border-r border-b border-white/20"></div>
            </div>
          </div>
        )}

        {/* AI Sparkle Icon */}
        <div className="absolute -top-3 -right-3 pointer-events-none">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Large sparkle */}
            <path
              d="M12 0C12 3 15 6 18 6C15 6 12 9 12 12C12 9 9 6 6 6C9 6 12 3 12 0Z"
              fill="url(#sparkleGradient1)"
            />
            {/* Small sparkle */}
            <path
              d="M18 12C18 14 20 16 22 16C20 16 18 18 18 20C18 18 16 16 14 16C16 16 18 14 18 12Z"
              fill="url(#sparkleGradient2)"
            />
            
            <defs>
              <linearGradient id="sparkleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="sparkleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hummy Avatar */}
        <div
          className={`relative transition-all duration-300 ${
            isActive ? 'scale-110' : 'hover:scale-105'
          } ${isDragging ? 'scale-105' : ''}`}
          onClick={(e) => {
            if (!isDragging) {
              setIsActive(!isActive);
            }
          }}
        >
          {/* Floating Animation Container */}
          <div className={isActive ? 'animate-pulse' : ''}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30"></div>
            
            {/* Main Avatar */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-full shadow-2xl border-2 border-white/30 overflow-hidden">
              {/* Hummingbird Silhouette */}
              <div className="absolute inset-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Main body - sharp geometric triangular shape */}
                  <path
                    d="M16 22L11 14L16 6L21 14L16 22Z"
                    fill="url(#bodyGradient)"
                  />
                  
                  {/* Sharp center accent */}
                  <path
                    d="M16 10L13 15L19 15L16 10Z"
                    fill="url(#accentGradient)"
                    opacity="0.9"
                  />
                  
                  {/* Left wing - geometric angular shape */}
                  <path
                    d="M11 14L3 10L7 18L11 14Z"
                    fill="url(#wingGradient)"
                    className="animate-pulse"
                    style={{animationDuration: '3s'}}
                  />
                  
                  {/* Right wing - geometric angular shape */}
                  <path
                    d="M21 14L29 10L25 18L21 14Z"
                    fill="url(#wingGradient)"
                    className="animate-pulse"
                    style={{animationDuration: '3s', animationDelay: '1s'}}
                  />
                  
                  {/* Tech-like accent dot */}
                  <circle 
                    cx="16" 
                    cy="14" 
                    r="1" 
                    fill="#00FFFF"
                    className="animate-pulse"
                    opacity="0.9"
                  />
                  
                  {/* Gradients matching FlowQi logo */}
                  <defs>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                      <stop offset="30%" stopColor="rgba(255,255,255,0.8)" />
                      <stop offset="70%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                    </linearGradient>
                    
                    <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                    </linearGradient>
                    
                    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Activity Indicator */}
              {isActive && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export additional function to trigger tips from outside
HummyAgent.showTip = null; // Will be set by the component

export default HummyAgent; 