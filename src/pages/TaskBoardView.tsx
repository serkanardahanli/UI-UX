import React, { useState } from 'react';
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
  List,
  Grid3X3,
  Clock,
  Target
} from 'lucide-react';

const TaskBoardView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [view, setView] = useState('board');
  const [expandedTasks, setExpandedTasks] = useState({});

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
      <path 
        d="M2 4L6 8" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M6 8L10 6L13 6" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M6 8L10 10L13 10" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <circle cx="2" cy="4" r="2" fill="currentColor" />
      <circle cx="6" cy="8" r="2" fill="currentColor" />
      <circle cx="13" cy="6" r="1.5" fill="currentColor" />
      <circle cx="13" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );

  const [tasks] = useState([
    {
      id: 1,
      name: 'Design system components update',
      status: 'to-do',
      priority: 'high',
      project: 'Website Redesign',
      assignees: [
        { id: 1, name: 'Emma Wilson', avatar: 'EW', color: 'bg-gradient-to-br from-blue-400 to-blue-600' }
      ],
      dueDate: '2025-05-28',
      comments: 3,
      attachments: 2,
      description: 'Update all design system components for the new brand guidelines',
      tags: ['Design', 'Frontend'],
      subtasks: [
        {
          id: 11,
          name: 'Research component patterns',
          status: 'working-on-it',
          assignees: [{ id: 1, name: 'Emma Wilson', avatar: 'EW', color: 'bg-gradient-to-br from-blue-400 to-blue-600' }],
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
        { id: 3, name: 'Sarah Johnson', avatar: 'SJ', color: 'bg-gradient-to-br from-emerald-400 to-emerald-600' }
      ],
      dueDate: '2025-05-30',
      comments: 1,
      attachments: 0,
      description: 'Analyze user interviews and extract key insights for product improvements',
      tags: ['Research', 'UX'],
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
      description: 'Review and update API documentation for v2.0 release',
      tags: ['Documentation'],
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
        { id: 1, name: 'Emma Wilson', avatar: 'EW', color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
        { id: 4, name: 'Alex Morgan', avatar: 'AM', color: 'bg-gradient-to-br from-orange-400 to-orange-600' }
      ],
      dueDate: '2025-05-25',
      comments: 5,
      attachments: 3,
      description: 'Implement the latest round of client feedback and suggestions',
      tags: ['Development', 'Client Work'],
      subtasks: []
    },
    {
      id: 5,
      name: 'Marketing campaign setup',
      status: 'completed',
      priority: 'medium',
      project: 'Sales',
      assignees: [
        { id: 5, name: 'Lisa Park', avatar: 'LP', color: 'bg-gradient-to-br from-pink-400 to-pink-600' }
      ],
      dueDate: '2025-05-24',
      comments: 4,
      attachments: 1,
      description: 'Set up the Q2 marketing campaign with all assets and workflows',
      tags: ['Marketing', 'Campaign'],
      subtasks: []
    },
    {
      id: 6,
      name: 'Database optimization',
      status: 'completed',
      priority: 'high',
      project: 'Backend',
      assignees: [
        { id: 2, name: 'Michael Chen', avatar: 'MC', color: 'bg-gradient-to-br from-purple-400 to-purple-600' }
      ],
      dueDate: '2025-05-23',
      comments: 2,
      attachments: 0,
      description: 'Optimize database queries for better performance and reduced load times',
      tags: ['Backend', 'Performance'],
      subtasks: []
    }
  ]);

  const columns = [
    { 
      id: 'to-do', 
      title: 'To Do', 
      icon: Target,
      gradient: 'from-slate-500 to-slate-600',
      lightGradient: 'from-slate-50 to-slate-100',
      accentColor: 'text-slate-600'
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      icon: Clock,
      gradient: 'from-blue-500 to-cyan-500',
      lightGradient: 'from-blue-50 to-cyan-50',
      accentColor: 'text-blue-600'
    },
    { 
      id: 'completed', 
      title: 'Completed', 
      icon: Target,
      gradient: 'from-emerald-500 to-green-500',
      lightGradient: 'from-emerald-50 to-green-50',
      accentColor: 'text-emerald-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'to-do': return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'To Do' };
      case 'working-on-it': return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Working on it' };
      case 'in-progress': return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' };
      case 'stuck': return { bg: 'bg-red-100', text: 'text-red-700', label: 'Stuck' };
      case 'not-started': return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Not Started' };
      case 'completed': return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Done' };
      case 'done': return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Done' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case 'high': return { color: 'bg-red-400', glow: 'shadow-red-200' };
      case 'medium': return { color: 'bg-amber-400', glow: 'shadow-amber-200' };
      case 'low': return { color: 'bg-blue-400', glow: 'shadow-blue-200' };
      default: return { color: 'bg-gray-400', glow: 'shadow-gray-200' };
    }
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleTask = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const formatDate = (date) => {
    if (!date) return '';
    const taskDate = new Date(date);
    const today = new Date();
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
    if (diffDays <= 7) return `${diffDays}d`;
    
    return taskDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const TaskCard = ({ task }) => {
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;
    const isExpanded = expandedTasks[task.id];
    const isSelected = selectedTasks.includes(task.id);
    const priorityIndicator = getPriorityIndicator(task.priority);

    return (
      <div className={`group bg-white rounded-lg border border-gray-200 p-3 mb-3 hover:shadow-md transition-all duration-200 cursor-pointer ${isSelected ? 'ring-2 ring-blue-400 shadow-md' : ''}`}>
        
        {/* Priority indicator */}
        <div className={`w-full h-0.5 ${priorityIndicator.color} rounded-full mb-3`}></div>

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleTaskSelect(task.id)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mt-0.5"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button 
            className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-3 text-sm leading-tight">{task.name}</h3>
        
        {/* Project */}
        {task.project && (
          <div className="mb-3">
            <span className="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700">
              {task.project}
            </span>
          </div>
        )}

        {/* Subtasks indicator */}
        {hasSubtasks && (
          <div className="mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task.id);
              }}
              className="flex items-center justify-between w-full text-xs text-blue-600 bg-blue-50 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FlowQiSubtaskIcon size={10} className="text-blue-500" />
                <span>{task.subtasks.length} subtasks</span>
                <span className="text-blue-500">
                  {task.subtasks.filter(st => st.status === 'completed' || st.status === 'done').length}/{task.subtasks.length}
                </span>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          </div>
        )}

        {/* Expanded subtasks */}
        {isExpanded && hasSubtasks && (
          <div className="mb-3 space-y-1">
            {task.subtasks.map(subtask => {
              const subtaskStatus = getStatusColor(subtask.status);
              return (
                <div key={subtask.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-700 truncate">{subtask.name}</span>
                  </div>
                  <span className={`px-1 py-0.5 rounded text-xs ${subtaskStatus.bg} ${subtaskStatus.text}`}>
                    {subtaskStatus.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Assignees */}
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
                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs font-medium text-white border border-white">
                    +{task.assignees.length - 2}
                  </div>
                )}
              </div>
            ) : (
              <button className="w-6 h-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center hover:border-blue-400 transition-colors">
                <Plus className="w-3 h-3 text-gray-400" />
              </button>
            )}

            {/* Comments & Attachments - only show if no subtasks */}
            {!hasSubtasks && (task.comments > 0 || task.attachments > 0) && (
              <div className="flex items-center space-x-1">
                {task.comments > 0 && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <MessageCircle className="w-3 h-3" />
                    <span className="text-xs">{task.comments}</span>
                  </div>
                )}
                {task.attachments > 0 && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Link className="w-3 h-3" />
                    <span className="text-xs">{task.attachments}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Due date */}
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Column = ({ column }) => {
    const columnTasks = getTasksByStatus(column.id).filter(task => 
      filteredTasks.some(ft => ft.id === task.id)
    );
    const IconComponent = column.icon;

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
        
        {/* Column Header */}
        <div className={`bg-gradient-to-r ${column.lightGradient} rounded-xl p-4 mb-6 border border-gray-100`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${column.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{column.title}</h3>
                <div className={`text-sm font-semibold ${column.accentColor} bg-white rounded-full px-3 py-1 mt-1 shadow-sm`}>
                  {columnTasks.length} tasks
                </div>
              </div>
            </div>
            
            <button className="p-2 hover:bg-white rounded-xl transition-colors shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-4 min-h-96">
          {columnTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
          
          {columnTasks.length === 0 && (
            <div className="text-center py-12">
              <div className={`w-16 h-16 bg-gradient-to-br ${column.lightGradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                <Grid3X3 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No tasks yet</p>
              <p className="text-gray-400 text-sm">Tasks will appear here</p>
            </div>
          )}
        </div>

        {/* Add task button */}
        <button className={`w-full mt-6 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-gradient-to-r ${column.lightGradient} transition-all duration-200 flex items-center justify-center space-x-2 group`}>
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Add new task</span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Task Board</h1>
            <p className="text-gray-600 mb-6">Manage your projects visually with our Kanban board</p>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Customize</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium">Filter</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Assignees</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                
                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner">
                  <button 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setView('list')}
                  >
                    <List className="w-4 h-4" />
                    <span>List</span>
                  </button>
                  <button 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'board' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setView('board')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    <span>Board</span>
                  </button>
                </div>
                
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">New Task</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Board Grid */}
        <div className="grid grid-cols-3 gap-8">
          {columns.map(column => (
            <Column key={column.id} column={column} />
          ))}
        </div>

        {/* Selected Tasks Toolbar */}
        {selectedTasks.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm font-bold">
                {selectedTasks.length}
              </div>
              <span className="font-semibold">Task{selectedTasks.length > 1 ? 's' : ''} selected</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors" title="Duplicate">
                <Copy className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors" title="Export">
                <Upload className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors" title="Archive">
                <Archive className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors" title="Delete">
                <Trash2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors" title="Move to">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={() => setSelectedTasks([])}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TaskBoardView; 