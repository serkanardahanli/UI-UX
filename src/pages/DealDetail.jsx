import React, { useState } from 'react';
import { 
  Phone, Mail, MessageSquare, Calendar, CheckSquare, 
  Clock, MapPin, User, Building, Tag, Star, MoreVertical,
  AlertCircle, CheckCircle, XCircle, FileText, Link2,
  TrendingUp, DollarSign, CalendarDays, Edit2, Trash2,
  Pin, Globe, Users, Package, ChevronDown, ChevronUp,
  Filter, ExternalLink, Briefcase, Hash, Plus, 
  ArrowRight, AlertTriangle, Check, RotateCw
} from 'lucide-react';

const DealDetailPage = () => {
  const [isStarred, setIsStarred] = useState(false);
  const [activeActivityType, setActiveActivityType] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [focusExpanded, setFocusExpanded] = useState(true);
  const [historyExpanded, setHistoryExpanded] = useState(true);
  const [historyFilter, setHistoryFilter] = useState('all');
  
  const [activityForm, setActivityForm] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    priority: 'normal',
    assignTo: 'me',
    location: '',
    note: '',
    contact: '',
    dueDate: '',
    project: ''
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    dueDate: '',
    assignee: '',
    project: '',
    priority: 'normal',
    description: ''
  });

  // Enhanced deal data with company info
  const deal = {
    id: 1,
    title: 'Enterprise FlowQi Implementation',
    company: {
      name: 'TechCorp Solutions',
      logo: 'TC',
      industry: 'Technology / SaaS',
      website: 'www.techcorp.com',
      location: 'Amsterdam, Netherlands',
      vatNumber: 'NL123456789B01',
      kvkNumber: '12345678',
      employees: '50-100'
    },
    contacts: [
      {
        id: 1,
        name: 'Sarah Mitchell',
        role: 'Head of Operations',
        email: 'sarah.mitchell@techcorp.com',
        phone: '+31 6 1234 5678',
        isPrimary: true
      },
      {
        id: 2,
        name: 'Tom Anderson',
        role: 'IT Manager',
        email: 'tom.anderson@techcorp.com',
        phone: '+31 6 2345 6789',
        isPrimary: false
      }
    ],
    stage: 'Proposal',
    probability: 75,
    value: 85000,
    expectedClose: '2024-02-15',
    nextAction: 'Send revised proposal',
    source: 'Website',
    assignedTo: 'John Doe',
    lastUpdate: '2 hours ago',
    created: '2024-01-05',
    tags: ['Enterprise', 'Q1 Priority', 'Upsell'],
    products: [
      { name: 'FlowQi Pro', quantity: 25, price: 2500 },
      { name: 'API Access', quantity: 1, price: 500 },
      { name: 'Training Package', quantity: 1, price: 3000 }
    ]
  };

  // Available projects for task creation
  const projects = [
    { id: 1, name: 'TechCorp Implementation Q1' },
    { id: 2, name: 'Enterprise Onboarding' },
    { id: 3, name: 'Custom Development' }
  ];

  // Focus items (upcoming activities)
  const focusItems = [
    {
      id: 1,
      type: 'call',
      title: 'Follow-up call with Sarah',
      date: 'Today',
      time: '14:00',
      contact: 'Sarah Mitchell',
      status: 'pending',
      overdue: false
    },
    {
      id: 2,
      type: 'task',
      title: 'Prepare custom demo environment',
      date: 'Today',
      time: '17:00',
      assignee: 'Sarah Chen',
      status: 'overdue',
      overdue: true
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Technical demo with IT team',
      date: 'Tomorrow',
      time: '10:00',
      location: 'Zoom',
      contact: 'Tom Anderson',
      status: 'scheduled'
    },
    {
      id: 4,
      type: 'email',
      title: 'Send revised proposal',
      date: 'Tomorrow',
      time: '12:00',
      status: 'pending'
    }
  ];

  // Historical activities
  const historicalActivities = [
    {
      id: 1,
      type: 'call',
      user: 'John Doe',
      date: '2024-01-10',
      time: '10:30',
      duration: '15 min',
      content: 'Discussed implementation timeline',
      contact: 'Sarah Mitchell',
      status: 'completed'
    },
    {
      id: 2,
      type: 'email',
      user: 'Emma Wilson',
      date: '2024-01-09',
      time: '14:15',
      content: 'Sent initial proposal',
      contact: 'Sarah Mitchell',
      status: 'completed',
      files: ['proposal_v1.pdf']
    },
    {
      id: 3,
      type: 'note',
      user: 'John Doe',
      date: '2024-01-08',
      content: 'Client interested in API integration',
      status: 'completed'
    },
    {
      id: 4,
      type: 'task',
      user: 'Sarah Chen',
      date: '2024-01-07',
      content: 'Research competitor pricing',
      status: 'completed',
      linkedProject: 'TechCorp Implementation Q1'
    }
  ];

  const activityTypes = [
    { type: 'call', icon: Phone, label: 'Call', color: 'bg-blue-500' },
    { type: 'email', icon: Mail, label: 'Email', color: 'bg-green-500' },
    { type: 'note', icon: MessageSquare, label: 'Note', color: 'bg-gray-500' },
    { type: 'meeting', icon: Calendar, label: 'Meeting', color: 'bg-purple-500' },
    { type: 'task', icon: CheckSquare, label: 'Task', color: 'bg-orange-500' }
  ];

  const getFocusIcon = (type) => {
    switch(type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      case 'task': return CheckSquare;
      default: return Clock;
    }
  };

  const getStatusColor = (status, overdue) => {
    if (overdue) return 'text-red-600 bg-red-50';
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStageColor = (stage) => {
    switch(stage.toLowerCase()) {
      case 'lead': return 'bg-gray-100 text-gray-700';
      case 'qualified': return 'bg-blue-100 text-blue-700';
      case 'proposal': return 'bg-purple-100 text-purple-700';
      case 'negotiation': return 'bg-yellow-100 text-yellow-700';
      case 'won': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const filteredHistory = historicalActivities.filter(activity => {
    if (historyFilter === 'all') return true;
    return activity.type === historyFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">{deal.title}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStageColor(deal.stage)}`}>
                {deal.stage}
              </span>
              <span className="text-sm text-gray-500">{deal.probability}% probability</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-lg">{formatCurrency(deal.value)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span>Expected close: {new Date(deal.expectedClose).toLocaleDateString('nl-NL')}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Next: {deal.nextAction}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsStarred(!isStarred)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Star className={`w-5 h-5 ${isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Activities */}
          <div className="col-span-2 space-y-6">
            {/* Add Activity Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Add Activity</h2>
              
              {/* Activity Type Buttons */}
              <div className="flex gap-2 mb-4">
                {activityTypes.map(({ type, icon: Icon, label, color }) => (
                  <button
                    key={type}
                    onClick={() => setActiveActivityType(activeActivityType === type ? null : type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                      ${activeActivityType === type 
                        ? `${color} text-white` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Inline Activity Form */}
              {activeActivityType && (
                <div className="border-t pt-4 space-y-4">
                  {/* Standard fields for non-task activities */}
                  {activeActivityType !== 'task' && (
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={activityForm.date}
                          onChange={(e) => setActivityForm({...activityForm, date: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                          type="time"
                          value={activityForm.time}
                          onChange={(e) => setActivityForm({...activityForm, time: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select 
                          value={activityForm.priority}
                          onChange={(e) => setActivityForm({...activityForm, priority: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                        <select 
                          value={activityForm.contact}
                          onChange={(e) => setActivityForm({...activityForm, contact: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select contact</option>
                          {deal.contacts.map(contact => (
                            <option key={contact.id} value={contact.name}>{contact.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Task-specific fields */}
                  {activeActivityType === 'task' && (
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <User className="w-4 h-4 inline mr-1" />
                          Assign to
                        </label>
                        <select 
                          value={activityForm.assignTo}
                          onChange={(e) => setActivityForm({...activityForm, assignTo: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="me">Me</option>
                          <option value="john">John Doe</option>
                          <option value="emma">Emma Wilson</option>
                          <option value="sarah">Sarah Chen</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <CalendarDays className="w-4 h-4 inline mr-1" />
                          Due date
                        </label>
                        <input
                          type="date"
                          value={activityForm.dueDate || ''}
                          onChange={(e) => setActivityForm({...activityForm, dueDate: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Briefcase className="w-4 h-4 inline mr-1" />
                          Project
                        </label>
                        <select 
                          value={activityForm.project || ''}
                          onChange={(e) => setActivityForm({...activityForm, project: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select project</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                        <select 
                          value={activityForm.contact}
                          onChange={(e) => setActivityForm({...activityForm, contact: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select contact</option>
                          {deal.contacts.map(contact => (
                            <option key={contact.id} value={contact.name}>{contact.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {activeActivityType === 'meeting' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Meeting location or video link"
                        value={activityForm.location}
                        onChange={(e) => setActivityForm({...activityForm, location: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                    <textarea
                      rows={3}
                      placeholder="Add details about this activity..."
                      value={activityForm.note}
                      onChange={(e) => setActivityForm({...activityForm, note: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors">
                      Save {activeActivityType === 'task' ? 'Task' : 'Activity'}
                    </button>
                    <button 
                      onClick={() => setActiveActivityType(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Focus Zone */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setFocusExpanded(!focusExpanded)}
              >
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Focus - What's Coming Up
                  <span className="text-sm font-normal text-gray-500">({focusItems.length} items)</span>
                </h2>
                {focusExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>

              {focusExpanded && (
                <div className="px-6 pb-6 space-y-3">
                  {focusItems.map((item) => {
                    const Icon = getFocusIcon(item.type);
                    return (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          item.overdue ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.overdue ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${item.overdue ? 'text-red-600' : 'text-gray-600'}`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>{item.date} at {item.time}</span>
                              {item.contact && (
                                <>
                                  <span>•</span>
                                  <span>{item.contact}</span>
                                </>
                              )}
                              {item.location && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {item.location}
                                  </span>
                                </>
                              )}
                              {item.assignee && (
                                <>
                                  <span>•</span>
                                  <span>Assigned to {item.assignee}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.overdue && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              Overdue
                            </span>
                          )}
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <RotateCw className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Historical Activities */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setHistoryExpanded(!historyExpanded)}
                  >
                    <h2 className="text-lg font-semibold">Activity History</h2>
                    {historyExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                  {historyExpanded && (
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <select 
                        value={historyFilter}
                        onChange={(e) => setHistoryFilter(e.target.value)}
                        className="text-sm border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="all">All Activities</option>
                        <option value="call">Calls</option>
                        <option value="email">Emails</option>
                        <option value="note">Notes</option>
                        <option value="task">Tasks</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {historyExpanded && (
                <div className="p-6 space-y-4">
                  {filteredHistory.map((activity) => {
                    const ActivityIcon = activity.type === 'call' ? Phone :
                                       activity.type === 'email' ? Mail :
                                       activity.type === 'note' ? MessageSquare :
                                       activity.type === 'task' ? CheckSquare : Clock;
                    
                    return (
                      <div key={activity.id} className="group relative flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                          ${activity.type === 'call' ? 'bg-blue-100' : ''}
                          ${activity.type === 'email' ? 'bg-green-100' : ''}
                          ${activity.type === 'note' ? 'bg-gray-100' : ''}
                          ${activity.type === 'task' ? 'bg-orange-100' : ''}`}>
                          <ActivityIcon className={`w-5 h-5
                            ${activity.type === 'call' ? 'text-blue-600' : ''}
                            ${activity.type === 'email' ? 'text-green-600' : ''}
                            ${activity.type === 'note' ? 'text-gray-600' : ''}
                            ${activity.type === 'task' ? 'text-orange-600' : ''}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-900">{activity.user}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(activity.date).toLocaleDateString('nl-NL')} at {activity.time}
                              </span>
                              {activity.duration && (
                                <span className="text-sm text-gray-500">• {activity.duration}</span>
                              )}
                              {activity.contact && (
                                <span className="text-sm text-gray-500">• {activity.contact}</span>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-700 mb-2">{activity.content}</p>

                          {(activity.files?.length > 0 || activity.linkedProject) && (
                            <div className="flex items-center gap-4 text-sm">
                              {activity.linkedProject && (
                                <span className="flex items-center gap-1 text-purple-600">
                                  <Briefcase className="w-3 h-3" />
                                  {activity.linkedProject}
                                </span>
                              )}
                              {activity.files?.map((file, index) => (
                                <span key={index} className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                                  <FileText className="w-3 h-3" />
                                  {file}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Context */}
          <div className="space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400" />
                Company Information
              </h3>
              
              <div className="space-y-4">
                {/* Company Header */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {deal.company.logo}
                  </div>
                  <div className="flex-1">
                    <a href="#" className="font-medium text-gray-900 hover:text-purple-600 flex items-center gap-1">
                      {deal.company.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-sm text-gray-500">{deal.company.industry}</p>
                  </div>
                </div>

                {/* Company Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href={`https://${deal.company.website}`} className="text-blue-600 hover:underline">
                      {deal.company.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{deal.company.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{deal.company.employees} employees</span>
                  </div>
                  <div className="pt-2 border-t space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT</span>
                      <span className="font-mono text-xs">{deal.company.vatNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">KvK</span>
                      <span className="font-mono text-xs">{deal.company.kvkNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                Contacts
              </h3>
              
              <div className="space-y-4">
                {deal.contacts.map((contact) => (
                  <div key={contact.id} className={`p-3 rounded-lg ${contact.isPrimary ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.role}</p>
                      </div>
                      {contact.isPrimary && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Primary</span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </a>
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deal Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Deal Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Source</span>
                  <span>{deal.source}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Owner</span>
                  <span>{deal.assignedTo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last update</span>
                  <span>{deal.lastUpdate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Created</span>
                  <span>{new Date(deal.created).toLocaleDateString('nl-NL')}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-gray-600 block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {deal.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Create Task */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-gray-400" />
                  Tasks
                </h3>
                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>

              {showTaskForm && (
                <div className="space-y-3 pb-4 mb-4 border-b">
                  <input
                    type="text"
                    placeholder="Task title..."
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                      className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <select
                      value={taskForm.assignee}
                      onChange={(e) => setTaskForm({...taskForm, assignee: e.target.value})}
                      className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Assignee</option>
                      <option value="me">Me</option>
                      <option value="john">John Doe</option>
                      <option value="emma">Emma Wilson</option>
                    </select>
                  </div>
                  <select
                    value={taskForm.project}
                    onChange={(e) => setTaskForm({...taskForm, project: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Link to project...</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                      Create Task
                    </button>
                    <button 
                      onClick={() => setShowTaskForm(false)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Existing tasks preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Research competitor pricing</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Prepare demo environment</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm">
                  <CheckCircle className="w-5 h-5" />
                  Mark as Won
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm">
                  <Calendar className="w-5 h-5" />
                  Schedule Follow-up
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm">
                  <FileText className="w-5 h-5" />
                  Send Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailPage; 