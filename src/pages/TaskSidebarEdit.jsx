import React, { useState } from 'react';
import { X, Calendar, Clock, Building2, User, Users, Flag, Timer, Plus, Hash, Paperclip, MessageSquare, Activity, ChevronDown, ChevronRight, MoreHorizontal, CheckCircle2, Circle, AlertCircle, ArrowLeft, Layers, Star } from 'lucide-react';

export default function TaskSidebarEdit() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('comments');
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [taskData, setTaskData] = useState({
    parentTask: 'Website Redesign Homepage',
    title: 'Create responsive navigation',
    assignee: { name: 'Sarah Johnson', avatar: 'SJ', color: 'bg-blue-500' },
    dueDate: '28 May 2025',
    status: 'In Progress',
    priority: 'Medium',
    timeTracked: '2h 15m',
    description: 'Design and implement a mobile-first responsive navigation system for the new homepage.',
    subtasks: [
      { id: 1, title: 'Design mobile menu', status: 'Completed', assignee: 'SJ', dueDate: '26 May' },
      { id: 2, title: 'Implement hamburger animation', status: 'In Progress', assignee: 'SJ', dueDate: '27 May' }
    ],
    checklist: [
      { id: 1, title: 'Test on all breakpoints', completed: true },
      { id: 2, title: 'Add accessibility features', completed: false },
      { id: 3, title: 'Browser compatibility check', completed: false }
    ],
    activity: [
      { user: 'Sarah Johnson', action: 'created this subtask', time: 'Today at 09:15' },
      { user: 'Alex Morgan', action: 'changed priority to Medium', time: 'Today at 10:30' }
    ]
  });

  const statusColors = {
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'Completed': 'bg-green-50 text-green-700 border-green-200',
    'To Do': 'bg-gray-50 text-gray-700 border-gray-200',
    'On Hold': 'bg-yellow-50 text-yellow-700 border-yellow-200'
  };

  const priorityColors = {
    'Low': { bg: 'bg-gray-50', text: 'text-gray-600', icon: 'text-gray-400' },
    'Medium': { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: 'text-yellow-500' },
    'High': { bg: 'bg-orange-50', text: 'text-orange-700', icon: 'text-orange-500' },
    'Urgent': { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500' }
  };

  return (
    <div className={`fixed right-0 top-0 h-full bg-white shadow-xl transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-[600px] z-50 border-l border-gray-200`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-medium text-sm">S</span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">{taskData.title}</h2>
              <span className="text-xs text-gray-500">Subtask</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Primary Fields - Blue Card Layout */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
            <div className="grid grid-cols-3 gap-6">
              {/* Status */}
              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1.5">Status</label>
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
                <label className="text-xs text-gray-600 font-medium block mb-1.5">Assignee</label>
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
                <label className="text-xs text-gray-600 font-medium block mb-1.5">Date</label>
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

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
            </div>
            <textarea 
              placeholder="Add a description…"
              value={taskData.description}
              className="w-full p-3 border border-gray-200 rounded-md hover:border-gray-300 transition-colors focus:outline-none focus:border-blue-500 resize-none text-sm"
              rows="3"
              onChange={(e) => setTaskData({...taskData, description: e.target.value})}
            />
          </div>

          {/* Subtasks */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Subtasks</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3 mb-3">
                {taskData.subtasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center text-white font-medium text-xs ${
                      task.status === 'Completed' ? 'bg-green-500' : 'bg-orange-400'
                    }`}>
                      {task.id}
                    </div>
                    <span className={`text-sm flex-1 ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {task.title}
                    </span>
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-[10px]">
                      {task.assignee}
                    </div>
                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
                <span>Add Subtask</span>
              </button>
            </div>
          </div>

          {/* Checklist */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Checklist ({taskData.checklist.filter(item => item.completed).length}/{taskData.checklist.length})</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3 mb-3">
                {taskData.checklist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        defaultChecked={item.completed}
                        onChange={(e) => {
                          const newChecklist = taskData.checklist.map(checkItem => 
                            checkItem.id === item.id ? {...checkItem, completed: e.target.checked} : checkItem
                          );
                          setTaskData({...taskData, checklist: newChecklist});
                        }}
                      />
                      <span className={`text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.title}
                      </span>
                    </div>
                    {!item.completed && (
                      <button className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
                <span>New Checklist Item</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tabs Section */}
      <div className="border-t border-gray-200 bg-white">
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
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  SJ
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 focus-within:border-blue-500 transition-colors">
                    <textarea 
                      placeholder="Add a comment..."
                      className="w-full text-sm text-gray-700 placeholder:text-gray-400 outline-none resize-none bg-transparent"
                      rows="2"
                    />
                    <div className="flex items-center justify-end mt-2">
                      <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'worklogs' && (
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  SJ
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium text-gray-900">Sarah Johnson</span>
                      <span className="text-sm text-gray-600"> logged </span>
                      <span className="text-sm font-medium text-gray-900">2h 15m</span>
                    </div>
                    <span className="text-xs text-gray-500">Today at 14:30</span>
                  </div>
                  <p className="text-sm text-gray-600">Worked on: Responsive navigation implementation</p>
                </div>
              </div>

              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Total time logged:</span>
                  <span className="text-sm font-bold text-gray-900">2h 15m</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {taskData.activity.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-gray-700">
                      <span className="font-medium">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 