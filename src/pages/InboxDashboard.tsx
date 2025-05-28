import React, { useState } from 'react';
import { Bell, MessageSquare, CheckCircle2, AlertCircle, Users, Calendar, FileText, TrendingUp, Gift, Target, Clock, Archive, Trash2, Star, Filter, Search, MoreHorizontal, Paperclip, Send, X, Circle, Check, ChevronDown, ArrowLeft } from 'lucide-react';

interface InboxDashboardProps {
  setCurrentView?: (view: string) => void;
}

export default function InboxDashboard({ setCurrentView }: InboxDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Inbox categories with counts
  const categories = [
    { id: 'all', label: 'All Inbox', icon: Bell, count: 24, color: 'text-gray-600' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: 8, color: 'text-blue-600' },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 12, color: 'text-purple-600' },
    { id: 'tasks', label: 'Task Updates', icon: CheckCircle2, count: 3, color: 'text-green-600' },
    { id: 'mentions', label: 'Mentions', icon: Users, count: 1, color: 'text-orange-600' }
  ];

  // Inbox items with different types
  const inboxItems = [
    {
      id: 1,
      type: 'message',
      title: 'Emma Wilson sent you a message',
      preview: 'Hey Serkan, I\'ve updated the dashboard designs. Can you take a look and provide feedback?',
      sender: { name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' },
      time: '5 min ago',
      unread: true,
      category: 'messages',
      priority: 'normal',
      attachments: 2,
      project: 'Website Redesign'
    },
    {
      id: 2,
      type: 'task',
      title: 'Task assigned to you: Review API Documentation',
      preview: 'Michael Chen assigned you a new task in the CRM Integration project',
      sender: { name: 'Michael Chen', avatar: 'MC', color: 'bg-purple-500' },
      time: '1 hour ago',
      unread: true,
      category: 'tasks',
      priority: 'high',
      dueDate: 'Tomorrow',
      project: 'CRM Integration'
    },
    {
      id: 3,
      type: 'notification',
      title: 'Project milestone completed',
      preview: 'The Design Phase milestone has been marked as complete in Website Redesign project',
      sender: { name: 'System', avatar: '✓', color: 'bg-green-500' },
      time: '2 hours ago',
      unread: false,
      category: 'notifications',
      priority: 'normal',
      project: 'Website Redesign'
    },
    {
      id: 4,
      type: 'mention',
      title: 'Sarah mentioned you in a comment',
      preview: '@serkan Can you check the latest numbers in the Q3 report? Something doesn\'t add up.',
      sender: { name: 'Sarah Johnson', avatar: 'SJ', color: 'bg-green-500' },
      time: '3 hours ago',
      unread: true,
      category: 'mentions',
      priority: 'normal',
      context: 'Q3 Budget Review'
    },
    {
      id: 5,
      type: 'message',
      title: 'Alex Morgan shared a file',
      preview: 'Sales presentation Q3.pptx - Please review before tomorrow\'s client meeting',
      sender: { name: 'Alex Morgan', avatar: 'AM', color: 'bg-orange-500' },
      time: '4 hours ago',
      unread: false,
      category: 'messages',
      priority: 'normal',
      attachments: 1,
      fileSize: '2.4 MB'
    },
    {
      id: 6,
      type: 'notification',
      title: 'Reminder: Team meeting in 30 minutes',
      preview: 'Weekly team sync - Meeting Room A',
      sender: { name: 'Calendar', avatar: '📅', color: 'bg-indigo-500' },
      time: '30 min',
      unread: true,
      category: 'notifications',
      priority: 'high',
      meetingLink: true
    },
    {
      id: 7,
      type: 'notification',
      title: 'Lisa Park\'s birthday is tomorrow',
      preview: 'Don\'t forget to wish Lisa a happy birthday!',
      sender: { name: 'HR System', avatar: '🎂', color: 'bg-pink-500' },
      time: 'Yesterday',
      unread: false,
      category: 'notifications',
      priority: 'low'
    },
    {
      id: 8,
      type: 'task',
      title: 'Task completed: UI Mockups',
      preview: 'Emma Wilson marked "Create UI Mockups" as complete',
      sender: { name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' },
      time: 'Yesterday',
      unread: false,
      category: 'tasks',
      priority: 'normal',
      project: 'Mobile App'
    }
  ];

  // Filter items based on category and search
  const filteredItems = inboxItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unread count
  const unreadCount = filteredItems.filter(item => item.unread).length;

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // Mark as read
    item.unread = false;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'normal': return 'text-gray-600 bg-gray-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'message': return MessageSquare;
      case 'task': return CheckCircle2;
      case 'notification': return Bell;
      case 'mention': return Users;
      default: return Bell;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView && setCurrentView('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-medium text-gray-900">Inbox</h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              
              {/* Filter button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* More options */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Categories */}
        <div className="w-64 bg-white border-r border-gray-100 p-4">
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${selectedCategory === category.id ? 'text-purple-600' : category.color}`} />
                    <span className="font-medium">{category.label}</span>
                  </div>
                  {category.count > 0 && (
                    <span className={`text-xs font-medium ${
                      selectedCategory === category.id ? 'text-purple-600' : 'text-gray-400'
                    }`}>
                      {category.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Archive className="w-4 h-4" />
              <span className="font-medium">Archived</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              <span className="font-medium">Trash</span>
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-3">This Week</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Messages sent</span>
                <span className="font-medium text-gray-900">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tasks completed</span>
                <span className="font-medium text-gray-900">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response time</span>
                <span className="font-medium text-green-600">2h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 flex">
          <div className="w-96 border-r border-gray-100 bg-white overflow-y-auto">
            {/* List Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-900">
                  {categories.find(c => c.id === selectedCategory)?.label}
                </h2>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                    Mark all as read
                  </button>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="divide-y divide-gray-50">
              {filteredItems.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedItem?.id === item.id 
                        ? 'bg-purple-50 border-l-2 border-purple-600' 
                        : 'hover:bg-gray-50'
                    } ${item.unread ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <div className={`w-10 h-10 ${item.sender.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                          {item.sender.avatar}
                        </div>
                        {item.unread && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className={`text-sm ${item.unread ? 'font-semibold' : 'font-medium'} text-gray-900 truncate pr-2`}>
                            {item.title}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.preview}</p>
                        
                        <div className="flex items-center gap-2">
                          <TypeIcon className="w-3.5 h-3.5 text-gray-400" />
                          {item.priority && item.priority !== 'normal' && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          )}
                          {item.project && (
                            <span className="text-xs text-gray-500">{item.project}</span>
                          )}
                          {item.attachments && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Paperclip className="w-3 h-3" />
                              <span>{item.attachments}</span>
                            </div>
                          )}
                          {item.dueDate && (
                            <span className="text-xs text-orange-600 font-medium">Due {item.dueDate}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No messages found</p>
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="flex-1 bg-white">
            {selectedItem ? (
              <div className="h-full flex flex-col">
                {/* Detail Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${selectedItem.sender.color} rounded-full flex items-center justify-center text-white font-medium`}>
                        {selectedItem.sender.avatar}
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">{selectedItem.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-600">From: {selectedItem.sender.name}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{selectedItem.time}</span>
                          {selectedItem.project && (
                            <>
                              <span className="text-sm text-gray-400">•</span>
                              <span className="text-sm text-purple-600">{selectedItem.project}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Star className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Archive className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Message Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700">{selectedItem.preview}</p>
                    
                    {selectedItem.type === 'message' && (
                      <div className="mt-6">
                        <p className="text-gray-700">
                          I wanted to get your thoughts on the new dashboard design. We've made several improvements based on the feedback from the last review:
                        </p>
                        <ul className="mt-3 space-y-2 text-gray-700">
                          <li>• Improved navigation structure</li>
                          <li>• Better color contrast for accessibility</li>
                          <li>• Mobile-responsive layout</li>
                          <li>• New data visualization components</li>
                        </ul>
                        <p className="mt-4 text-gray-700">
                          Let me know if you have any questions or suggestions!
                        </p>
                      </div>
                    )}
                    
                    {selectedItem.type === 'task' && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Task Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Project:</span>
                            <span className="font-medium text-gray-900">{selectedItem.project}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Due Date:</span>
                            <span className="font-medium text-orange-600">{selectedItem.dueDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority:</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedItem.priority)}`}>
                              {selectedItem.priority}
                            </span>
                          </div>
                        </div>
                        <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                          View Task
                        </button>
                      </div>
                    )}
                    
                    {selectedItem.attachments && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">Attachments ({selectedItem.attachments})</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Dashboard_Design_v2.fig</p>
                              <p className="text-xs text-gray-500">1.2 MB • Figma File</p>
                            </div>
                            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                              Download
                            </button>
                          </div>
                          {selectedItem.attachments > 1 && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Design_Guidelines.pdf</p>
                                <p className="text-xs text-gray-500">420 KB • PDF</p>
                              </div>
                              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {selectedItem.meetingLink && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Join Meeting</h4>
                            <p className="text-sm text-gray-600 mt-1">Click to join the video call</p>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Join Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Quick Reply */}
                {selectedItem.type === 'message' && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        SA
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Type your reply..."
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                          rows="3"
                        />
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                              <Paperclip className="w-4 h-4" />
                            </button>
                          </div>
                          <button className="px-4 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 