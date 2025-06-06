import React, { useState } from 'react';
import { 
  ArrowLeft,
  Edit,
  MoreHorizontal,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Target,
  Clock,
  Plus,
  MessageSquare,
  FileText,
  Video,
  MapPin,
  Send,
  Star,
  AlertCircle,
  CheckCircle,
  Paperclip,
  Download,
  ExternalLink,
  UserCheck,
  Zap,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

const DealDetail = ({ dealId = 1 }) => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [newActivityType, setNewActivityType] = useState('note');
  const [newActivityContent, setNewActivityContent] = useState('');
  const [showNewActivityForm, setShowNewActivityForm] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState('all');

  // Mock deal data
  const deal = {
    id: 1,
    name: 'FlowQi Enterprise - TechCorp',
    company: 'TechCorp Solutions',
    contact: {
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+31 6 1234 5678',
      position: 'IT Director',
      avatar: 'SJ'
    },
    value: 25000,
    probability: 80,
    stage: 'negotiation',
    closeDate: '2024-12-20',
    assignedTo: {
      name: 'Emma Wilson',
      avatar: 'EW',
      email: 'emma@flowqi.com'
    },
    priority: 'high',
    source: 'Website',
    tags: ['Enterprise', 'Tech', 'Hot Lead'],
    nextAction: {
      type: 'call',
      date: '2024-12-08',
      description: 'Follow-up call regarding pricing'
    },
    rotting: {
      status: false,
      lastActivity: '2024-12-05'
    }
  };

  // Mock activities timeline
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'note',
      title: 'Meeting notes from demo session',
      content: 'Great demo session with Sarah and the IT team. They are particularly interested in the workflow automation features. Need to prepare a custom quote for enterprise features.',
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      timestamp: '2024-12-05T14:30:00',
      attachments: []
    },
    {
      id: 2,
      type: 'call',
      title: 'Inbound call - Technical questions',
      content: 'Sarah called with technical questions about API integrations and security compliance. Provided detailed answers and shared technical documentation.',
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      timestamp: '2024-12-04T11:15:00',
      duration: '25 min',
      attachments: [
        { name: 'API Documentation.pdf', size: '2.4 MB' },
        { name: 'Security Compliance.pdf', size: '1.8 MB' }
      ]
    },
    {
      id: 3,
      type: 'email',
      title: 'Sent proposal and pricing',
      content: 'Sent detailed proposal with custom pricing for enterprise features. Included implementation timeline and support options.',
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      timestamp: '2024-12-03T09:20:00',
      attachments: [
        { name: 'FlowQi Enterprise Proposal.pdf', size: '4.2 MB' }
      ]
    },
    {
      id: 4,
      type: 'meeting',
      title: 'Product Demo Session',
      content: 'Conducted live demo of FlowQi platform. Showed workflow automation, reporting features, and team collaboration tools. Very positive response from the team.',
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      timestamp: '2024-12-02T15:00:00',
      duration: '60 min',
      location: 'Video Call - Teams',
      attendees: ['Sarah Johnson', 'Mike Chen (CTO)', 'Lisa Park (PM)'],
      attachments: []
    },
    {
      id: 5,
      type: 'note',
      title: 'Initial contact and qualification',
      content: 'Qualified lead from website contact form. Company has 50+ employees, currently using basic project management tools. Looking for comprehensive solution.',
      author: 'David Smith',
      authorAvatar: 'DS',
      timestamp: '2024-11-28T10:30:00',
      attachments: []
    }
  ]);

  // Activity types configuration
  const activityTypes = [
    { 
      id: 'note', 
      label: 'Note', 
      icon: FileText, 
      color: 'bg-blue-100 text-blue-700',
      placeholder: 'Add a note about this deal...'
    },
    { 
      id: 'call', 
      label: 'Call', 
      icon: Phone, 
      color: 'bg-green-100 text-green-700',
      placeholder: 'Call summary and next steps...'
    },
    { 
      id: 'email', 
      label: 'Email', 
      icon: Mail, 
      color: 'bg-purple-100 text-purple-700',
      placeholder: 'Email summary or follow-up...'
    },
    { 
      id: 'meeting', 
      label: 'Meeting', 
      icon: Video, 
      color: 'bg-orange-100 text-orange-700',
      placeholder: 'Meeting notes and outcomes...'
    },
    { 
      id: 'task', 
      label: 'Task', 
      icon: CheckCircle, 
      color: 'bg-yellow-100 text-yellow-700',
      placeholder: 'Task description and deadline...'
    }
  ];

  // Pipeline stages
  const stages = [
    { id: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-700' },
    { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-700' },
    { id: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-700' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-100 text-purple-700' },
    { id: 'won', label: 'Won', color: 'bg-green-100 text-green-700' },
    { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700' }
  ];

  const getCurrentStage = () => {
    return stages.find(stage => stage.id === deal.stage) || stages[0];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    const activityType = activityTypes.find(t => t.id === type);
    return activityType ? activityType.icon : FileText;
  };

  const getActivityColor = (type) => {
    const activityType = activityTypes.find(t => t.id === type);
    return activityType ? activityType.color : 'bg-gray-100 text-gray-700';
  };

  const handleAddActivity = () => {
    if (!newActivityContent.trim()) return;

    const newActivity = {
      id: activities.length + 1,
      type: newActivityType,
      title: `${activityTypes.find(t => t.id === newActivityType)?.label} - ${new Date().toLocaleDateString()}`,
      content: newActivityContent,
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      timestamp: new Date().toISOString(),
      attachments: []
    };

    setActivities([newActivity, ...activities]);
    setNewActivityContent('');
    setShowNewActivityForm(false);
  };

  const filteredActivities = activities.filter(activity => {
    if (timelineFilter === 'all') return true;
    return activity.type === timelineFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{deal.name}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">{deal.company}</span>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCurrentStage().color}`}>
                    {getCurrentStage().label}
                  </span>
                  {deal.priority === 'high' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      High Priority
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Deal
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Quick Action
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content - Timeline */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Deal Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Value & Probability */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deal Value</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(deal.value)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-600">{deal.probability}% probability</span>
                </div>
              </div>

              {/* Close Date */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Close</p>
                    <p className="text-lg font-bold text-gray-900">{formatDate(deal.closeDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-600">12 days remaining</span>
                </div>
              </div>

              {/* Next Action */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Action</p>
                    <p className="text-sm font-medium text-gray-900">{deal.nextAction.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-600">{formatDate(deal.nextAction.date)}</span>
                </div>
              </div>
            </div>

            {/* Add New Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Activity</h3>
                {!showNewActivityForm && (
                  <button 
                    onClick={() => setShowNewActivityForm(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    New Activity
                  </button>
                )}
              </div>

              {/* Activity Type Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {activityTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setNewActivityType(type.id);
                        setShowNewActivityForm(true);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        newActivityType === type.id && showNewActivityForm
                          ? type.color
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  );
                })}
              </div>

              {/* New Activity Form */}
              {showNewActivityForm && (
                <div className="space-y-4">
                  <textarea
                    value={newActivityContent}
                    onChange={(e) => setNewActivityContent(e.target.value)}
                    placeholder={activityTypes.find(t => t.id === newActivityType)?.placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                    rows="3"
                  />
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleAddActivity}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Add Activity
                    </button>
                    <button 
                      onClick={() => {
                        setShowNewActivityForm(false);
                        setNewActivityContent('');
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select 
                      value={timelineFilter}
                      onChange={(e) => setTimelineFilter(e.target.value)}
                      className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none appearance-none text-sm"
                    >
                      <option value="all">All Activities</option>
                      {activityTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.label}s</option>
                      ))}
                    </select>
                    <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="space-y-6">
                {filteredActivities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="relative">
                      {/* Timeline Line */}
                      {index !== filteredActivities.length - 1 && (
                        <div className="absolute left-5 top-12 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      
                      <div className="flex gap-4">
                        {/* Activity Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)} flex-shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Activity Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{activity.title}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1">
                                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                    {activity.authorAvatar}
                                  </div>
                                  <span className="text-sm text-gray-600">{activity.author}</span>
                                </div>
                                <span className="text-sm text-gray-500">{formatDateTime(activity.timestamp)}</span>
                                {activity.duration && (
                                  <span className="text-sm text-gray-500">• {activity.duration}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Activity Details */}
                          <div className="bg-gray-50 rounded-xl p-4 mb-3">
                            <p className="text-gray-700 text-sm leading-relaxed">{activity.content}</p>
                            
                            {/* Meeting Details */}
                            {activity.type === 'meeting' && activity.location && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                  <MapPin className="w-4 h-4" />
                                  {activity.location}
                                </div>
                                {activity.attendees && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <UserCheck className="w-4 h-4" />
                                    <span>Attendees: {activity.attendees.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Attachments */}
                          {activity.attachments && activity.attachments.length > 0 && (
                            <div className="space-y-2">
                              {activity.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                  <Paperclip className="w-4 h-4 text-blue-600" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-900">{attachment.name}</p>
                                    <p className="text-xs text-blue-600">{attachment.size}</p>
                                  </div>
                                  <button className="p-1 text-blue-600 hover:text-blue-800 rounded">
                                    <Download className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Deal & Contact Info */}
          <div className="space-y-6">
            
            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact</h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {deal.contact.avatar}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{deal.contact.name}</h4>
                  <p className="text-sm text-gray-600">{deal.contact.position}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${deal.contact.email}`} className="text-sm text-purple-600 hover:text-purple-800">
                    {deal.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${deal.contact.phone}`} className="text-sm text-purple-600 hover:text-purple-800">
                    {deal.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{deal.company}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                </div>
              </div>
            </div>

            {/* Deal Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Source</span>
                  <span className="text-sm font-medium text-gray-900">{deal.source}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Assigned To</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {deal.assignedTo.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{deal.assignedTo.name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Created Date</span>
                  <span className="text-sm font-medium text-gray-900">28 Nov 2024</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Activity</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(deal.rotting.lastActivity)}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {deal.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Mark as Won
                </button>
                
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Follow-up
                </button>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Proposal
                </button>

                <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Star className="w-4 h-4" />
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetail; 