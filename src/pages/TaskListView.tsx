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
  X
} from 'lucide-react';

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

  const [tasks] = useState([
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
  ]);

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
        <td colSpan="5" className="px-6 py-2">
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
        <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedTasks.includes(task.id) ? 'bg-blue-50' : ''}`}>
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
              <td colSpan="5" className="px-6 py-2 pl-12">
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
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2">
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
              <button className="p-2 hover:bg-blue-500 rounded" title="Delete">
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
    </div>
  );
};

export default TaskListView; 