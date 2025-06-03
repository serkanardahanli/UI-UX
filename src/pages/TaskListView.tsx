import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Plus,
  Calendar,
  MessageCircle,
  Link,
  ArrowUpDown,
  Users,
  Settings,
  User,
  Copy,
  Upload,
  Archive,
  Trash2,
  RotateCcw,
  ArrowRight,
  Zap,
  X,
  CheckCircle
} from 'lucide-react';

// FlowQi Toast Component for Undo functionality
const Toast = ({ message, onUndo, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10);

    // Progress animation
    const duration = 5000;
    const interval = 50;
    const decrement = (100 / duration) * interval;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(progressTimer);
          handleClose();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    // Auto close after 5 seconds
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed bottom-6 left-6 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 z-50 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
      }`}
      style={{ minWidth: '320px' }}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-gray-100 w-full">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex items-center gap-3 p-4 pt-5">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>
        
        {/* Message */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          <p className="text-xs text-gray-500 mt-0.5">This action can be undone</p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onUndo();
              handleClose();
            }}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Undo
          </button>
          
          <button
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Success Toast Variant
const SuccessToast = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed bottom-6 left-6 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 z-50 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
      }`}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
    </div>
  );
};

// CreateTask Modal Component
const CreateTaskModal = ({ isOpen, onClose, onTaskCreate }) => {
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('to-do');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskProject, setTaskProject] = useState('Website Redesign');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now(), // Simple ID generation
      name: taskName.trim(),
      status: taskStatus,
      priority: taskPriority,
      project: taskProject,
      assignees: [],
      dueDate: taskDueDate || null,
      comments: 0,
      attachments: 0,
      subtasks: []
    };

    onTaskCreate(newTask);
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      // Reset form
      setTaskName('');
      setTaskStatus('to-do');
      setTaskPriority('medium');
      setTaskProject('Website Redesign');
      setTaskDueDate('');
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Name *
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project
            </label>
            <select
              value={taskProject}
              onChange={(e) => setTaskProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Website Redesign">Website Redesign</option>
              <option value="CRM Integration">CRM Integration</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Initial tasks data (backup)
const INITIAL_TASKS = [
  {
    id: 1,
    name: 'Design system components update',
    status: 'to-do',
    priority: 'high',
    project: 'Website Redesign',
    assignees: [
      { id: 1, name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' }
    ],
    dueDate: '2025-05-28',
    comments: 3,
    attachments: 2,
    subtasks: [
      {
        id: 11,
        name: 'Research component patterns',
        status: 'working-on-it',
        assignees: [{ id: 1, name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' }],
        dueDate: '2025-05-26'
      },
      {
        id: 12,
        name: 'Create component library',
        status: 'stuck',
        assignees: [],
        dueDate: '2025-05-27'
      }
    ]
  },
  {
    id: 2,
    name: 'User interview analysis',
    status: 'in-progress',
    priority: 'medium',
    project: 'CRM Integration',
    assignees: [
      { id: 3, name: 'Sarah Johnson', avatar: 'SJ', color: 'bg-green-500' }
    ],
    dueDate: '2025-05-30',
    comments: 1,
    attachments: 0,
    subtasks: []
  },
  {
    id: 3,
    name: 'API documentation review',
    status: 'to-do',
    priority: 'low',
    project: 'Website Redesign',
    assignees: [],
    dueDate: null,
    comments: 0,
    attachments: 1,
    subtasks: [
      {
        id: 31,
        name: 'Review endpoint documentation',
        status: 'not-started',
        assignees: [],
        dueDate: null
      }
    ]
  },
  {
    id: 4,
    name: 'Client feedback implementation',
    status: 'in-progress',
    priority: 'high',
    project: 'CRM Integration',
    assignees: [
      { id: 1, name: 'Emma Wilson', avatar: 'EW', color: 'bg-blue-500' },
      { id: 4, name: 'Alex Morgan', avatar: 'AM', color: 'bg-orange-500' }
    ],
    dueDate: '2025-05-25',
    comments: 5,
    attachments: 3,
    subtasks: []
  },
  {
    id: 5,
    name: 'Marketing campaign setup',
    status: 'completed',
    priority: 'medium',
    project: 'Sales',
    assignees: [
      { id: 5, name: 'Lisa Park', avatar: 'LP', color: 'bg-pink-500' }
    ],
    dueDate: '2025-05-24',
    comments: 4,
    attachments: 1,
    subtasks: []
  }
];

const TaskListView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    'to-do': true,
    'in-progress': true,
    'completed': false
  });
  const [expandedTasks, setExpandedTasks] = useState({});
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  
  // Toast and undo functionality state
  const [toasts, setToasts] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [deleteTimeouts, setDeleteTimeouts] = useState({});

  // Create task modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isAddingQuickTask, setIsAddingQuickTask] = useState(false);

  // Custom FlowQi Subtask Icon Component
  const FlowQiSubtaskIcon = ({ size = 16, className = "" }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main flow line */}
      <path 
        d="M2 4L6 8" 
        stroke="#3B82F6" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Upper subtask branch */}
      <path 
        d="M6 8L10 6L13 6" 
        stroke="#3B82F6" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      
      {/* Lower subtask branch */}
      <path 
        d="M6 8L10 10L13 10" 
        stroke="#3B82F6" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      
      {/* Flow dots */}
      <circle cx="2" cy="4" r="2" fill="#3B82F6" />
      <circle cx="6" cy="8" r="2" fill="#1D4ED8" />
      <circle cx="13" cy="6" r="1.5" fill="#60A5FA" />
      <circle cx="13" cy="10" r="1.5" fill="#60A5FA" />
    </svg>
  );

  // FlowQi Hummy AI Assistant Component
  const HummyAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {/* Simple Floating Button - Make it very visible for testing */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-bold transition-all duration-300"
            title="Hummy AI Assistant"
          >
            🦉
          </button>
        </div>

        {/* Simple Popup for testing */}
        {isOpen && (
          <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50">
            <h3 className="font-bold text-lg mb-2">Hi Serkan! 👋</h3>
            <p className="text-gray-600 mb-4">Hummy is working!</p>
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        )}
      </>
    );
  };

  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Reset function to restore all tasks
  const resetAllTasks = () => {
    // Clear all timeouts
    Object.values(deleteTimeouts).forEach(timeout => clearTimeout(timeout));
    
    // Reset all states
    setTasks(INITIAL_TASKS);
    setDeletedTasks([]);
    setDeleteTimeouts({});
    setToasts([]);
    setSelectedTasks([]);
    
    // Show success message
    addToast('success', 'All tasks restored successfully! 🎉');
  };

  // Create task functions
  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleTaskCreate = (newTask) => {
    setTasks(prev => [...prev, newTask].sort((a, b) => a.id - b.id));
    addToast('success', `Task "${newTask.name}" created successfully! 🎉`);
  };

  const addQuickTask = () => {
    setIsAddingQuickTask(true);
    
    const quickTask = {
      id: Date.now(),
      name: 'New Task',
      status: 'to-do',
      priority: 'medium',
      project: 'Website Redesign',
      assignees: [],
      dueDate: null,
      comments: 0,
      attachments: 0,
      subtasks: []
    };

    setTasks(prev => [...prev, quickTask].sort((a, b) => a.id - b.id));
    addToast('success', 'Quick task added! Click to edit details.');
    
    // Reset adding state after animation
    setTimeout(() => setIsAddingQuickTask(false), 500);
  };

  // Toast management functions
  const addToast = (type, message, onUndo = null) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message, onUndo }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Delete task with undo functionality
  const deleteTask = (task) => {
    // Store the current task data with a unique key
    const deletedTaskData = { ...task, deletedAt: Date.now() };
    
    // Remove from list
    setTasks(prev => prev.filter(t => t.id !== task.id));
    
    // Store for undo with timestamp
    setDeletedTasks(prev => [...prev, deletedTaskData]);
    
    // Show toast with undo callback
    addToast('delete', `"${task.name}" deleted`, () => restoreTask(task.id, deletedTaskData));
    
    // Schedule permanent deletion
    const timeout = setTimeout(() => {
      permanentlyDeleteTask(task.id);
    }, 5000);
    
    setDeleteTimeouts(prev => ({ ...prev, [task.id]: timeout }));
  };

  // Restore deleted task
  const restoreTask = (taskId, taskData = null) => {
    // Find task in deleted tasks or use provided data
    const task = taskData || deletedTasks.find(t => t.id === taskId);
    if (!task) {
      return;
    }

    // Cancel deletion timer
    if (deleteTimeouts[taskId]) {
      clearTimeout(deleteTimeouts[taskId]);
      setDeleteTimeouts(prev => {
        const newTimeouts = { ...prev };
        delete newTimeouts[taskId];
        return newTimeouts;
      });
    }

    // Remove deletedAt timestamp if present
    const cleanTask = { ...task };
    delete cleanTask.deletedAt;

    // Restore task to the correct position
    setTasks(prev => {
      const newTasks = [...prev, cleanTask];
      return newTasks.sort((a, b) => a.id - b.id);
    });

    // Remove from deleted tasks
    setDeletedTasks(prev => prev.filter(t => t.id !== taskId));

    // Show success message
    addToast('success', 'Task restored successfully');
  };

  // Permanently delete task
  const permanentlyDeleteTask = (taskId) => {
    setDeletedTasks(prev => prev.filter(t => t.id !== taskId));
    setDeleteTimeouts(prev => {
      const newTimeouts = { ...prev };
      delete newTimeouts[taskId];
      return newTimeouts;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'to-do': return { bg: 'bg-red-100', text: 'text-red-700', label: 'To Do' };
      case 'working-on-it': return { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Working on it' };
      case 'in-progress': return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' };
      case 'stuck': return { bg: 'bg-red-100', text: 'text-red-700', label: 'Stuck' };
      case 'not-started': return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Not Started' };
      case 'completed': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Done' };
      case 'done': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Done' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleTask = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const SectionHeader = ({ status, tasks }) => {
    const sectionTasks = tasks.filter(task => task.status === status);
    const isExpanded = expandedSections[status];
    const statusInfo = getStatusColor(status);

    if (sectionTasks.length === 0) return null;

    return (
      <tr className="bg-gray-50">
        <td colSpan="6" className="px-6 py-2">
          <button
            onClick={() => toggleSection(status)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <span className="font-medium text-sm">{statusInfo.label}</span>
          </button>
        </td>
      </tr>
    );
  };

  const SubtaskRow = ({ subtask, parentId, isLast }) => {
    const statusInfo = getStatusColor(subtask.status);
    
    return (
      <tr className="bg-white border-l-2 border-blue-300 hover:bg-gray-50">
        <td className="px-6 py-2 pl-12">
          <input
            type="checkbox"
            checked={selectedTasks.includes(subtask.id)}
            onChange={() => handleTaskSelect(subtask.id)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </td>
        
        <td className="px-6 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <span className="text-gray-700 text-sm">{subtask.name}</span>
          </div>
        </td>
        
        <td className="px-6 py-2">
          <div className="flex items-center">
            {subtask.assignees.length > 0 ? (
              <div className="flex -space-x-1">
                {subtask.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className={`w-5 h-5 rounded-full ${assignee.color} flex items-center justify-center text-xs font-medium text-white border border-white`}
                    title={assignee.name}
                  >
                    {assignee.avatar}
                  </div>
                ))}
              </div>
            ) : (
              <button className="w-5 h-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                <Plus className="w-2 h-2 text-gray-400" />
              </button>
            )}
          </div>
        </td>
        
        <td className="px-6 py-2">
          <span className={`px-2 py-1 rounded text-xs ${statusInfo.bg} ${statusInfo.text}`}>
            {statusInfo.label}
          </span>
        </td>
        
        <td className="px-6 py-2">
          {subtask.dueDate ? (
            <span className="text-blue-600 text-sm">{formatDate(subtask.dueDate)}</span>
          ) : (
            <button className="text-gray-400 hover:text-blue-600 text-xs">
              + Add
            </button>
          )}
        </td>
        
        <td className="px-6 py-2 w-20">
          {/* Empty actions column for subtasks */}
        </td>
      </tr>
    );
  };

  const TaskRow = ({ task, isVisible }) => {
    if (!isVisible) return null;
    
    const isExpanded = expandedTasks[task.id];
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;
    const statusInfo = getStatusColor(task.status);

    return (
      <>
        <tr className={`group border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedTasks.includes(task.id) ? 'bg-blue-50' : ''}`}>
          <td className="px-6 py-3 w-12">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleTaskSelect(task.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </td>
          
          <td className="px-6 py-3">
            <div className="flex items-center space-x-2">
              {hasSubtasks && (
                <button
                  onClick={() => toggleTask(task.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-gray-500" />
                  )}
                </button>
              )}
              
              {!hasSubtasks && <div className="w-5"></div>}
              
              <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                <User className="w-3 h-3 text-orange-600" />
              </div>
              
              <span className="text-gray-900 font-medium">{task.name}</span>
              
              {/* Subtask indicator */}
              {hasSubtasks && (
                <div className="flex items-center space-x-2 ml-3">
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200">
                    <FlowQiSubtaskIcon size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">{task.subtasks.length} subtasks</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {task.subtasks.filter(st => st.status === 'completed' || st.status === 'done').length}/{task.subtasks.length} done
                  </span>
                </div>
              )}
              
              {(task.comments > 0 || task.attachments > 0) && (
                <div className="flex items-center space-x-1 ml-2">
                  {task.attachments > 0 && (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Link className="w-3 h-3" />
                      <span className="text-xs">{task.attachments}</span>
                    </div>
                  )}
                  {task.comments > 0 && (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MessageCircle className="w-3 h-3" />
                      <span className="text-xs">{task.comments}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </td>
          
          <td className="px-6 py-3 w-28">
            <div className="flex items-center">
              {task.assignees.length > 0 ? (
                <div className="flex -space-x-1">
                  {task.assignees.slice(0, 2).map((assignee) => (
                    <div
                      key={assignee.id}
                      className={`w-6 h-6 rounded-full ${assignee.color} flex items-center justify-center text-xs font-medium text-white border border-white`}
                      title={assignee.name}
                    >
                      {assignee.avatar}
                    </div>
                  ))}
                  {task.assignees.length > 2 && (
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 border border-white">
                      +{task.assignees.length - 2}
                    </div>
                  )}
                </div>
              ) : (
                <button className="w-6 h-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                  <Plus className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>
          </td>
          
          <td className="px-6 py-3 w-28">
            <span className={`px-2 py-1 rounded text-xs ${statusInfo.bg} ${statusInfo.text}`}>
              {statusInfo.label}
            </span>
          </td>
          
          <td className="px-6 py-3 w-24">
            {task.dueDate ? (
              <span className="text-blue-600 text-sm">{formatDate(task.dueDate)}</span>
            ) : (
              <button className="text-gray-400 hover:text-blue-600 text-xs">
                + Add
              </button>
            )}
          </td>
          
          <td className="px-6 py-3 w-20">
            <button
              onClick={() => deleteTask(task)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </td>
        </tr>
        
        {/* Subtasks */}
        {isExpanded && hasSubtasks && (
          <>
            {task.subtasks.map((subtask, index) => (
              <SubtaskRow 
                key={subtask.id} 
                subtask={subtask} 
                parentId={task.id}
                isLast={index === task.subtasks.length - 1}
              />
            ))}
            <tr className="bg-white border-l-2 border-blue-300">
              <td colSpan="6" className="px-6 py-2 pl-12">
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm transition-colors">
                  <Plus className="w-3 h-3" />
                  <span>Add subitem</span>
                </button>
              </td>
            </tr>
          </>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Task List</h1>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search task..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                <Settings className="w-4 h-4" />
                <span>Customize</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                <Users className="w-4 h-4" />
                <span>Assignees</span>
              </button>
              
              <button 
                onClick={resetAllTasks}
                className="flex items-center space-x-2 px-3 py-2 bg-red-50 border border-red-200 text-red-700 rounded hover:bg-red-100 transition-colors"
                title="Reset all tasks"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Tasks</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Show Completed</span>
              </label>
              
              <button 
                onClick={openCreateModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-2 text-left w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-900">
                  Task
                </th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-900 w-28">
                  Owner
                </th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-900 w-28">
                  Status
                </th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-900 w-24">
                  Due date
                </th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-900 w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              
              {/* To-Do Section */}
              <SectionHeader status="to-do" tasks={filteredTasks} />
              {expandedSections['to-do'] && 
                getTasksByStatus('to-do')
                  .filter(task => 
                    task.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(task => (
                    <TaskRow key={task.id} task={task} isVisible={true} />
                  ))
              }
              
              {/* In Progress Section */}
              <SectionHeader status="in-progress" tasks={filteredTasks} />
              {expandedSections['in-progress'] && 
                getTasksByStatus('in-progress')
                  .filter(task => 
                    task.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(task => (
                    <TaskRow key={task.id} task={task} isVisible={true} />
                  ))
              }
              
              {/* Completed Section */}
              {(showCompleted || expandedSections['completed']) && (
                <>
                  <SectionHeader status="completed" tasks={filteredTasks} />
                  {expandedSections['completed'] && 
                    getTasksByStatus('completed')
                      .filter(task => 
                        task.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(task => (
                        <TaskRow key={task.id} task={task} isVisible={true} />
                      ))
                  }
                </>
              )}
              
            </tbody>
          </table>
          
          {/* Add Task Button at bottom of table */}
          <div className="border-t border-gray-200 bg-gray-50">
            <button
              onClick={addQuickTask}
              className={`w-full px-6 py-3 text-left flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 ${
                isAddingQuickTask ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add task</span>
              {isAddingQuickTask && (
                <div className="ml-2 flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Selected Tasks Toolbar */}
        {selectedTasks.length > 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-lg shadow-lg px-4 py-3 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-medium">
                {selectedTasks.length}
              </div>
              <span>Task{selectedTasks.length > 1 ? 's' : ''} selected</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-blue-500 rounded" title="Duplicate">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-blue-500 rounded" title="Export">
                <Upload className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-blue-500 rounded" title="Archive">
                <Archive className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const tasksToDelete = tasks.filter(task => selectedTasks.includes(task.id));
                  tasksToDelete.forEach(task => deleteTask(task));
                  setSelectedTasks([]);
                }}
                className="p-2 hover:bg-blue-500 rounded" 
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-blue-500 rounded" title="Convert">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-blue-500 rounded" title="Move to">
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-blue-500 rounded" title="Apps">
                <Zap className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setSelectedTasks([])}
              className="p-2 hover:bg-blue-500 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
      
      {/* Toast Containers */}
      {toasts.map(toast => (
        toast.type === 'delete' ? (
          <Toast
            key={toast.id}
            message={toast.message}
            onUndo={toast.onUndo}
            onClose={() => removeToast(toast.id)}
          />
        ) : (
          <SuccessToast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        )
      ))}
      
      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={closeCreateModal}
        onTaskCreate={handleTaskCreate}
      />

      {/* Hummy AI Assistant Component */}
      <HummyAssistant />
    </div>
  );
};

export default TaskListView; 