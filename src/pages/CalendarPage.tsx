import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar,
  X,
  Trash2,
  Search,
  ChevronDown,
  Clock,
  Users,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');

  const [projects] = useState([
    { id: 1, name: 'Website Redesign', color: '#3B82F6', circle: 'Projects' },
    { id: 2, name: 'CRM Integration', color: '#8B5CF6', circle: 'CRM' },
    { id: 3, name: 'Sales', color: '#10B981', circle: 'Sales' },
    { id: 4, name: 'Projects', color: '#F59E0B', circle: 'Projects' }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Sprint Planning',
      description: 'Weekly sprint planning meeting',
      date: '2025-05-26',
      time: '09:00',
      duration: 60,
      projectId: 1,
      priority: 'high',
      type: 'activity',
      location: 'Meeting Room A',
      attendees: 2
    },
    {
      id: 2,
      title: 'Review client proposal',
      description: 'Review and provide feedback on the client proposal',
      date: '2025-05-26',
      time: '14:00',
      duration: 30,
      projectId: 2,
      priority: 'medium',
      type: 'task',
      location: 'Office',
      attendees: 1
    },
    {
      id: 3,
      title: 'UI/UX Review',
      description: 'Review the latest UI/UX designs',
      date: '2025-05-27',
      time: '10:00',
      duration: 90,
      projectId: 1,
      priority: 'high',
      type: 'review',
      location: 'Design Studio',
      attendees: 3
    }
  ]);

  // My Day schedule data
  const mySchedule = [
    {
      time: '09:00',
      title: 'Sprint Planning',
      type: 'meeting',
      module: 'Projects',
      duration: '1h',
      priority: 'high',
      attendees: ['Emma Wilson', 'Michael Chen'],
      location: 'Meeting Room A'
    },
    {
      time: '10:30',
      title: 'Review client proposal',
      type: 'task',
      module: 'CRM',
      client: 'Google Netherlands',
      priority: 'high'
    },
    {
      time: '11:00',
      title: 'Call Sarah from TechCorp',
      type: 'call',
      module: 'Sales',
      duration: '30m',
      phone: '+31 6 12345678'
    },
    {
      time: '12:30',
      title: 'Lunch with MT',
      type: 'lunch',
      location: 'Restaurant De Kas',
      attendees: ['Alex Morgan', 'Lisa Park']
    },
    {
      time: '14:00',
      title: 'UI/UX Review',
      type: 'review',
      module: 'Projects',
      priority: 'medium'
    },
    {
      time: '16:00',
      title: 'Team Coffee & Catch-up',
      type: 'social',
      location: 'Kitchen Area'
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const viewOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getTasksForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => task.date === dateStr);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === 'all' || task.projectId === parseInt(filterProject);
    return matchesSearch && matchesProject;
  });

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    closeTaskModal();
  };

  const getProjectColor = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.color : '#6B7280';
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
                <p className="text-gray-600">Manage your tasks and activities</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {/* Project Filter */}
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
              
              {/* Create Button */}
              <div className="relative">
                <button
                  onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showCreateDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">New Task</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">New Event</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">New Meeting</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - 3 Columns */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - My Day */}
          <div className="col-span-3 space-y-6">
            {/* My Day */}
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">My Day</h3>
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">
                    {mySchedule.length} items
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
                {mySchedule.map((item, i) => (
                  <div key={i} className="p-3 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium text-gray-900">{item.time}</span>
                        {item.duration && (
                          <span className="text-xs text-gray-500">{item.duration}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors truncate">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {item.module && (
                                <span className="text-xs px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded">
                                  {item.module}
                                </span>
                              )}
                              {item.location && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {item.location.length > 15 ? item.location.substring(0, 15) + '...' : item.location}
                                </span>
                              )}
                            </div>
                            {item.attendees && Array.isArray(item.attendees) && (
                              <span className="text-xs text-gray-500 mt-1 block">
                                with {item.attendees.length} others
                              </span>
                            )}
                            {item.client && (
                              <span className="text-xs text-gray-500 mt-1 block">{item.client}</span>
                            )}
                            {item.phone && (
                              <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <Phone className="w-3 h-3" />
                                {item.phone}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {item.priority && (
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                item.priority === 'high' 
                                  ? 'bg-red-50 text-red-600' 
                                  : 'bg-yellow-50 text-yellow-600'
                              }`}>
                                {item.priority}
                              </span>
                            )}
                            <ArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Tasks */}
            <div className="bg-white rounded-lg border border-gray-100 p-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
              
              {/* Project Filter */}
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Middle Column - Calendar */}
          <div className="col-span-9">
            {/* Calendar Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <h2 className="text-xl font-semibold text-gray-900">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {viewOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setView(option.value)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        view === option.value
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday Headers */}
                {weekdays.map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {getDaysInMonth(currentDate).map((day, index) => {
                  const dayTasks = getTasksForDate(day);
                  const isToday = day && 
                    new Date().getDate() === day && 
                    new Date().getMonth() === currentDate.getMonth() && 
                    new Date().getFullYear() === currentDate.getFullYear();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-gray-100 ${
                        day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                      } ${isToday ? 'bg-purple-50 border-purple-200' : ''}`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'text-purple-700' : 'text-gray-900'
                          }`}>
                            {day}
                          </div>
                          
                          <div className="space-y-1">
                            {dayTasks.slice(0, 2).map(task => (
                              <div
                                key={task.id}
                                onClick={() => openTaskModal(task)}
                                className="text-xs p-1 rounded cursor-pointer hover:opacity-80"
                                style={{ backgroundColor: getProjectColor(task.projectId) + '20', color: getProjectColor(task.projectId) }}
                              >
                                <div className="font-medium truncate">{task.title}</div>
                                <div className="text-xs opacity-75">{task.time}</div>
                              </div>
                            ))}
                            
                            {dayTasks.length > 2 && (
                              <div className="text-xs text-gray-500 font-medium">
                                +{dayTasks.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Task Modal */}
        {showTaskModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Task Details</h3>
                <button
                  onClick={closeTaskModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{selectedTask.title}</h4>
                    <p className="text-gray-600 text-sm">{selectedTask.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date</label>
                      <p className="text-sm text-gray-900">{selectedTask.date}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Time</label>
                      <p className="text-sm text-gray-900">{selectedTask.time}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</label>
                      <p className="text-sm text-gray-900">{selectedTask.duration} min</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Project</label>
                    <p className="text-sm text-gray-900">{getProjectName(selectedTask.projectId)}</p>
                  </div>
                  
                  {selectedTask.location && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</label>
                      <p className="text-sm text-gray-900">{selectedTask.location}</p>
                    </div>
                  )}
                  
                  {selectedTask.attendees && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Attendees</label>
                      <p className="text-sm text-gray-900">{selectedTask.attendees} people</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => deleteTask(selectedTask.id)}
                  className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={closeTaskModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 