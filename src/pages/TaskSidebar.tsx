import React, { useState } from 'react';
import { X, Calendar, Clock, Building2, User, Users, Flag, Timer, Plus, Hash, Paperclip, MessageSquare, Activity, ChevronDown, ChevronRight, MoreHorizontal, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export default function TaskSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [taskData, setTaskData] = useState({
    title: 'First project',
    assignee: { name: 'SERKAN ARDAHANLI', avatar: 'SA', color: 'bg-pink-500' },
    dueDate: '17 ~ 31 May',
    status: 'In Progress',
    priority: 'High',
    organisation: 'Google Netherlands',
    contact: 'Steve Jobs',
    timeTracked: '0h',
    description: '',
    subtasks: [
      { id: 1, title: 'Second task', status: 'New', assignee: 'SERKAN ARDAHANLI', startDate: '22/05/2025', dueDate: '26/05/2025' },
      { id: 2, title: 'First task', status: 'Completed', assignee: 'SERKAN ARDAHANLI', startDate: '15/05/2025', dueDate: '21/05/2025' },
      { id: 3, title: 'Third task', status: 'New', assignee: 'SERKAN ARDAHANLI', startDate: '27/05/2025', dueDate: '29/05/2025' }
    ],
    activity: [
      { user: 'SERKAN ARDAHANLI', action: 'Set approval due date to 22 May', time: '14:48' },
      { user: 'SERKAN ARDAHANLI', action: 'Started project approval', time: '14:48' },
      { user: 'SERKAN ARDAHANLI', action: 'Added SERKAN ARDAHANLI as approver', time: '14:48' }
    ]
  });

  const statusColors = {
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'Completed': 'bg-green-50 text-green-700 border-green-200',
    'New': 'bg-gray-50 text-gray-700 border-gray-200',
    'On Hold': 'bg-yellow-50 text-yellow-700 border-yellow-200'
  };

  return (
    <div className={`fixed right-0 top-0 h-full bg-white shadow-xl transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-[600px] z-50 border-l border-gray-200 flex flex-col`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100 2H6a4 4 0 01-4-4V5z" />
            </svg>
            <h2 className="text-lg font-medium text-gray-900">{taskData.title}</h2>
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-6 pb-8">
          {/* Primary Fields - Grid Layout */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-3 gap-6">
              {/* Status */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1.5">Status</label>
                <button className={`w-full px-3 py-2 rounded-md border text-sm font-medium flex items-center justify-between transition-all hover:shadow-sm ${statusColors[taskData.status]}`}>
                  <div className="flex items-center gap-2">
                    <Circle className="w-3.5 h-3.5" />
                    <span>{taskData.status}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              {/* Assignee */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1.5">Assignee</label>
                <button className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm flex items-center justify-between hover:border-gray-300 transition-all">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${taskData.assignee.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                      {taskData.assignee.avatar}
                    </div>
                    <span className="font-medium text-gray-900 truncate">{taskData.assignee.name}</span>
                  </div>
                </button>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1.5">Date</label>
                <button className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm flex items-center justify-between hover:border-gray-300 transition-all">
                  <span className="font-medium text-gray-900">{taskData.dueDate}</span>
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* More Fields Toggle */}
          <button 
            onClick={() => setShowMoreFields(!showMoreFields)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
          >
            {showMoreFields ? (
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            )}
            <span>More</span>
          </button>

          {/* Extended Fields - Collapsible Grid */}
          {showMoreFields && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Priority */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1.5">Priority</label>
                  <button className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm flex items-center justify-between hover:border-gray-300 transition-all">
                    <div className="flex items-center gap-2">
                      <Flag className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-gray-900">High</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>

                {/* Organisation */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1.5">Organisation</label>
                  <button className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm flex items-center justify-between hover:border-gray-300 transition-all">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-900 truncate">Google Netherlands</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>

                {/* Contact */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1.5">Contact</label>
                  <button className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm flex items-center justify-between hover:border-gray-300 transition-all">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-900">Steve Jobs</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>

                {/* Time Tracked */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1.5">Time Tracked</label>
                  <button className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm flex items-center justify-between hover:border-gray-300 transition-all">
                    <div className="flex items-center gap-2">
                      <Timer className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-900">0h logged</span>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Add a description</label>
            </div>
            <div className="p-3 border border-gray-200 rounded-md hover:border-gray-300 transition-colors cursor-text min-h-[80px]">
              <p className="text-sm text-gray-400">Add a description...</p>
            </div>
          </div>

          {/* Subtasks */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Subtasks</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                    1
                  </div>
                  <span className="text-sm text-gray-700 flex-1">Subtask 1</span>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                    F
                  </div>
                  <span className="text-sm text-gray-600">30 May</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                    2
                  </div>
                  <span className="text-sm text-gray-700 flex-1">Subtask 2</span>
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                    S
                  </div>
                  <span className="text-sm text-gray-600">31 May</span>
                </div>
              </div>

              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
                <span>Add subtask</span>
              </button>
            </div>
          </div>

          {/* Checklists */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Checklist (0/0)</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Check 1</span>
                  </div>
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Check 2</span>
                  </div>
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Check 3</span>
                  </div>
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
                <span>New Checklist Item</span>
              </button>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">0</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">1 file</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">1d65fa30-ca41-437e-a548-c0b805b1a351-b-4c01.jpg</p>
                <p className="text-xs text-gray-500">14:47</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">SERKAN ARDAHANLI</span>
                <button className="text-blue-600 hover:text-blue-700">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700 mt-2">
              Add files
            </button>
          </div>

          {/* Activity */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Today</h3>
            <div className="space-y-3">
              {taskData.activity.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    SA
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{item.user}</span>{' '}
                      <span className="text-gray-600">{item.action}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tabs Section */}
      <div className="border-t border-gray-200 bg-white flex-shrink-0">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'comments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              COMMENTS
            </button>
            <button
              onClick={() => setActiveTab('worklogs')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'worklogs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              WORK LOGS
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'activity'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ACTIVITY LOG
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'comments' && (
            <div>
              {/* Existing Comments */}
              <div className="space-y-4 mb-4 max-h-48 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    SA
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Serkan Ardahanli</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-700">The design looks great! Let's proceed with the development phase.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    EW
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Emma Wilson</span>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-700">I've reviewed the mockups. We need to adjust the color scheme for better accessibility.</p>
                  </div>
                </div>
              </div>

              {/* Comment Input */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  SA
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 focus-within:border-blue-500 transition-colors">
                    <textarea 
                      placeholder="Comment here..."
                      className="w-full text-sm text-gray-700 placeholder:text-gray-400 outline-none resize-none bg-transparent"
                      rows="2"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <span className="text-xs font-bold">B</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <span className="text-xs italic">I</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <span className="text-xs line-through">S</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <span className="text-xs">T</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'worklogs' && (
            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  SA
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium text-gray-900">Serkan Ardahanli</span>
                      <span className="text-sm text-gray-600"> logged </span>
                      <span className="text-sm font-medium text-gray-900">2h</span>
                    </div>
                    <span className="text-xs text-gray-500">Today at 14:30</span>
                  </div>
                  <p className="text-sm text-gray-600">Worked on: Sidebar screen project management - Created the initial layout and structure</p>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  EW
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium text-gray-900">Emma Wilson</span>
                      <span className="text-sm text-gray-600"> logged </span>
                      <span className="text-sm font-medium text-gray-900">1h 30m</span>
                    </div>
                    <span className="text-xs text-gray-500">Yesterday at 16:45</span>
                  </div>
                  <p className="text-sm text-gray-600">Worked on: Review and feedback on UI components</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Total time logged:</span>
                  <span className="text-sm font-bold text-gray-900">3h 30m</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <div className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Serkan Ardahanli</span> created this task
                  </p>
                  <p className="text-xs text-gray-500">May 26, 2025 at 09:15</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Serkan Ardahanli</span> changed due date to <span className="font-medium">May 31, 2025</span>
                  </p>
                  <p className="text-xs text-gray-500">May 26, 2025 at 10:30</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Emma Wilson</span> was assigned to this task
                  </p>
                  <p className="text-xs text-gray-500">May 26, 2025 at 11:00</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Serkan Ardahanli</span> changed status from <span className="text-gray-600">To Do</span> to <span className="font-medium text-blue-600">In Progress</span>
                  </p>
                  <p className="text-xs text-gray-500">May 26, 2025 at 14:00</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Flag className="w-4 h-4 text-orange-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Emma Wilson</span> set priority to <span className="font-medium text-orange-600">High</span>
                  </p>
                  <p className="text-xs text-gray-500">May 26, 2025 at 14:30</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Paperclip className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Serkan Ardahanli</span> attached <span className="font-medium">design-mockup.jpg</span>
                  </p>
                  <p className="text-xs text-gray-500">May 26, 2025 at 15:00</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Emma Wilson</span> commented on this task
                  </p>
                  <p className="text-xs text-gray-500">May 26, 2025 at 15:30</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 