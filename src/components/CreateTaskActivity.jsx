import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Building, 
  Users, 
  FileText, 
  Phone, 
  Mail, 
  Target,
  Briefcase,
  Headphones,
  ShoppingCart,
  Settings,
  Plus,
  Lock,
  ChevronRight,
  DollarSign,
  UserPlus,
  Folder,
  Globe
} from 'lucide-react';

const CreateTaskActivity = ({ isOpen, onClose, initialType = '' }) => {
  const [formData, setFormData] = useState({
    type: initialType,
    title: '',
    description: '',
    date: '',
    time: '09:00',
    duration: 60,
    priority: 'medium',
    module: '',
    project: null,
    linkedItem: null,
    isPrivate: false,
    assignedTo: null,
    status: 'todo'
  });
  
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTab, setSearchTab] = useState('All');
  const [searchContext, setSearchContext] = useState('');

  // Reset form when opening/closing
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        type: initialType,
        title: '',
        description: '',
        date: '',
        time: '09:00',
        duration: 60,
        priority: 'medium',
        module: '',
        project: null,
        linkedItem: null,
        isPrivate: false,
        assignedTo: null,
        status: 'todo'
      });
    }
  }, [isOpen, initialType]);

  const userModules = [
    { id: 'projects', name: 'Project Management', icon: Target, color: 'bg-blue-500' },
    { id: 'sales', name: 'Sales Tool', icon: ShoppingCart, color: 'bg-green-500' }
  ];

  const searchData = {
    recentSearches: ['lorem ipsum dolor', 'dolor', 'lorem'],
    results: {
      All: [
        { id: 1, type: 'task', name: 'Task Name', project: 'project:name', meta: 'Due tomorrow', icon: FileText },
        { id: 2, type: 'project', name: 'Project Name', circle: 'circle:name', meta: 'Updated 2 days ago', icon: Target },
        { id: 3, type: 'team', name: 'Team Name', circle: 'circle:name', meta: '5 members', icon: Users },
        { id: 4, type: 'contact', name: 'John Doe', meta: 'Finance Manager', icon: User },
        { id: 5, type: 'organization', name: 'ACME Corp', meta: 'Organization', icon: Building }
      ],
      Tasks: [
        { id: 1, type: 'task', name: 'Design Review', project: 'Website Redesign', meta: 'Due today', icon: FileText },
        { id: 2, type: 'task', name: 'Code Review', project: 'API Development', meta: 'Due tomorrow', icon: FileText }
      ],
      Projects: [
        { 
          id: 1, 
          type: 'project', 
          name: 'Website Redesign', 
          circle: 'Development', 
          meta: 'Updated today', 
          icon: Target,
          statuses: ['todo', 'in-progress', 'in-review', 'complete']
        },
        { 
          id: 2, 
          type: 'project', 
          name: 'CRM Integration', 
          circle: 'Backend', 
          meta: 'Updated yesterday', 
          icon: Target,
          statuses: ['todo', 'in-progress', 'testing', 'deployed']
        },
        { 
          id: 3, 
          type: 'project', 
          name: 'Mobile App Development', 
          circle: 'Mobile Team', 
          meta: 'Updated 3 days ago', 
          icon: Target
        }
      ],
      Contacts: [
        { id: 1, type: 'contact', name: 'John Doe', meta: 'Finance Manager', icon: User },
        { id: 2, type: 'contact', name: 'Jane Smith', meta: 'Project Manager', icon: User }
      ],
      Organizations: [
        { id: 1, type: 'organization', name: 'ACME Corp', meta: 'Technology Company', icon: Building },
        { id: 2, type: 'organization', name: 'Global Solutions', meta: 'Consulting Firm', icon: Building }
      ],
      Deals: [
        { id: 1, type: 'deal', name: 'ACME Corp - Enterprise License', meta: '€50,000 - Negotiation', icon: ShoppingCart },
        { id: 2, type: 'deal', name: 'TechStart - Consulting Services', meta: '€15,000 - Proposal', icon: ShoppingCart }
      ],
      Tickets: [
        { id: 1, type: 'ticket', name: 'Login Issues - Priority', meta: 'High Priority - Open', icon: Headphones },
        { id: 2, type: 'ticket', name: 'Feature Request - Dashboard', meta: 'Medium Priority - In Progress', icon: Headphones }
      ],
      Users: [
        { id: 1, type: 'user', name: 'John Doe', meta: 'Project Manager', icon: User },
        { id: 2, type: 'user', name: 'Jane Smith', meta: 'Developer', icon: User },
        { id: 3, type: 'user', name: 'Mike Johnson', meta: 'Designer', icon: User },
        { id: 4, type: 'user', name: 'Sarah Williams', meta: 'QA Engineer', icon: User }
      ],
      Teams: [
        { id: 1, type: 'team', name: 'Development Team', meta: '8 members', icon: Users },
        { id: 2, type: 'team', name: 'Design Team', meta: '5 members', icon: Users },
        { id: 3, type: 'team', name: 'Marketing Team', meta: '6 members', icon: Users }
      ]
    }
  };

  const getSearchTabs = () => {
    if (searchContext === 'project') return ['Projects'];
    if (searchContext === 'user') return ['Users', 'Teams'];
    if (searchContext === 'deal') return ['Deals', 'Contacts', 'Organizations'];
    if (searchContext === 'ticket') return ['Tickets', 'Contacts', 'Organizations'];
    if (searchContext === 'task') return ['Tasks'];
    return ['All', 'Tasks', 'Projects', 'Contacts', 'Organizations', 'Deals', 'Tickets'];
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type: type === 'private-activity' ? 'activity' : type,
      module: '',
      project: null,
      linkedItem: null,
      isPrivate: type === 'private-activity',
      assignedTo: null,
      status: type === 'task' ? 'todo' : ''
    }));
  };

  const handlePrivateToggle = () => {
    setFormData(prev => ({
      ...prev,
      isPrivate: !prev.isPrivate,
      module: '',
      linkedItem: null
    }));
  };

  const handleModuleChange = (moduleId) => {
    setFormData(prev => ({
      ...prev,
      module: moduleId,
      linkedItem: null
    }));
  };

  const openSearch = (context) => {
    setSearchContext(context);
    setShowSearch(true);
    setSearchTerm('');
    
    if (context === 'project') setSearchTab('Projects');
    else if (context === 'deal') setSearchTab('Deals');
    else if (context === 'ticket') setSearchTab('Tickets');
    else if (context === 'task') setSearchTab('Tasks');
    else if (context === 'user') setSearchTab('Users');
    else setSearchTab('All');
  };

  const selectSearchItem = (item) => {
    if (searchContext === 'project') {
      const defaultStatus = item.statuses ? item.statuses[0] : 'todo';
      setFormData(prev => ({ ...prev, project: item, status: defaultStatus }));
    } else if (searchContext === 'user') {
      setFormData(prev => ({ ...prev, assignedTo: item }));
    } else {
      setFormData(prev => ({ ...prev, linkedItem: item }));
    }
    setShowSearch(false);
  };

  const filteredResults = searchData.results[searchTab]?.filter(item =>
    searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getLinkedItemLabel = () => {
    if (formData.module === 'sales') return 'Deal';
    if (formData.module === 'support') return 'Ticket';
    if (formData.module === 'projects') return 'Project Task';
    return 'Item';
  };

  const getLinkedItemContext = () => {
    if (formData.module === 'sales') return 'deal';
    if (formData.module === 'support') return 'ticket';
    if (formData.module === 'projects') return 'task';
    return 'item';
  };

  const handleSubmit = () => {
    // Here you would normally save to database
    console.log('Creating:', formData.type, formData);
    
    const typeNames = {
      task: 'Task',
      activity: 'Activity',
      deal: 'Deal',
      contact: 'Contact',
      organization: 'Organization',
      project: 'Project',
      circle: 'Circle'
    };
    
    const typeName = typeNames[formData.type] || 'Item';
    
    // Show success message (you could implement toast notifications)
    alert(`${typeName} "${formData.title}" created successfully!`);
    
    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create New</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              
              {!formData.type && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">What would you like to create?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleTypeChange('deal')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-500 transition-colors">
                          <DollarSign className="w-6 h-6 text-green-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Deal</div>
                          <div className="text-sm text-gray-500 mt-1">Sales opportunity</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTypeChange('contact')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors">
                          <UserPlus className="w-6 h-6 text-blue-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Contact</div>
                          <div className="text-sm text-gray-500 mt-1">Person or lead</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTypeChange('organization')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-500 transition-colors">
                          <Building className="w-6 h-6 text-purple-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Organization</div>
                          <div className="text-sm text-gray-500 mt-1">Company or client</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTypeChange('project')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-500 transition-colors">
                          <Folder className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Project</div>
                          <div className="text-sm text-gray-500 mt-1">Work project</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTypeChange('circle')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-500 transition-colors">
                          <Globe className="w-6 h-6 text-orange-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Circle</div>
                          <div className="text-sm text-gray-500 mt-1">Team or department</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTypeChange('private-activity')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-500 hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-500 transition-colors">
                          <Lock className="w-6 h-6 text-gray-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Private Activity</div>
                          <div className="text-sm text-gray-500 mt-1">Personal appointment</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTypeChange('activity')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-500 transition-colors">
                          <Calendar className="w-6 h-6 text-green-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Activity</div>
                          <div className="text-sm text-gray-500 mt-1">Call, meeting, appointment</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTypeChange('task')}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors">
                          <FileText className="w-6 h-6 text-blue-600 group-hover:text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Task</div>
                          <div className="text-sm text-gray-500 mt-1">Work item in a project</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {formData.type && (
                <>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {formData.type === 'task' ? (
                        <>
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Creating a Task</span>
                        </>
                      ) : formData.type === 'activity' ? (
                        <>
                          {formData.isPrivate ? (
                            <>
                              <Lock className="w-5 h-5 text-gray-600" />
                              <span className="font-medium">Creating a Private Activity</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-5 h-5 text-green-600" />
                              <span className="font-medium">Creating an Activity</span>
                            </>
                          )}
                        </>
                      ) : formData.type === 'deal' ? (
                        <>
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="font-medium">Creating a Deal</span>
                        </>
                      ) : formData.type === 'contact' ? (
                        <>
                          <UserPlus className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Creating a Contact</span>
                        </>
                      ) : formData.type === 'organization' ? (
                        <>
                          <Building className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">Creating an Organization</span>
                        </>
                      ) : formData.type === 'project' ? (
                        <>
                          <Folder className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium">Creating a Project</span>
                        </>
                      ) : formData.type === 'circle' ? (
                        <>
                          <Globe className="w-5 h-5 text-orange-600" />
                          <span className="font-medium">Creating a Circle</span>
                        </>
                      ) : null}
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, type: '' }))}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Change type
                    </button>
                  </div>

                  {formData.type === 'activity' && !formData.module && !formData.isPrivate && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Type</h3>
                      <div className="space-y-3">
                        <button
                          onClick={handlePrivateToggle}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all text-left group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200">
                                <Lock className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium">Private Activity</div>
                                <div className="text-sm text-gray-500">Personal appointment (e.g., doctor, gym)</div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </button>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-gray-500">or link to module</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {userModules.map(module => {
                            const IconComponent = module.icon;
                            return (
                              <button
                                key={module.id}
                                onClick={() => handleModuleChange(module.id)}
                                className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all text-left group"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${module.color}`}>
                                    <IconComponent className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="font-medium">{module.name}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {(formData.type === 'task' || formData.isPrivate || formData.module || ['deal', 'contact', 'organization', 'project', 'circle'].includes(formData.type)) && (
                    <>
                      {formData.type === 'task' ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
                            <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Create responsive navigation"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-gray-400">(Optional)</span></label>
                            <textarea
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Add task details..."
                            />
                          </div>
                        </div>
                      ) : formData.type === 'activity' ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              placeholder={
                                formData.isPrivate 
                                  ? 'e.g. Doctor appointment'
                                  : 'e.g. Call with John Doe'
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              placeholder="Add more details..."
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {formData.type === 'deal' ? 'Deal Name' :
                               formData.type === 'contact' ? 'Contact Name' :
                               formData.type === 'organization' ? 'Organization Name' :
                               formData.type === 'project' ? 'Project Name' :
                               formData.type === 'circle' ? 'Circle Name' : 'Name'} *
                            </label>
                            <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder={
                                formData.type === 'deal' ? 'e.g. ACME Corp - Enterprise License' :
                                formData.type === 'contact' ? 'e.g. John Doe' :
                                formData.type === 'organization' ? 'e.g. ACME Corporation' :
                                formData.type === 'project' ? 'e.g. Website Redesign' :
                                formData.type === 'circle' ? 'e.g. Development Team' : 'Enter name...'
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-gray-400">(Optional)</span></label>
                            <textarea
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              placeholder={
                                formData.type === 'deal' ? 'Add deal details, value, probability...' :
                                formData.type === 'contact' ? 'Add contact details, role, company...' :
                                formData.type === 'organization' ? 'Add organization details, industry, size...' :
                                formData.type === 'project' ? 'Add project goals, timeline, requirements...' :
                                formData.type === 'circle' ? 'Add team description, responsibilities...' : 'Add details...'
                              }
                            />
                          </div>
                        </div>
                      )}

                      {formData.type === 'task' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Assignee <span className="text-gray-400">(Optional)</span>
                            </label>
                            <button
                              onClick={() => openSearch('user')}
                              className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left"
                            >
                              {formData.assignedTo ? (
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center space-x-3">
                                    {formData.assignedTo.type === 'team' ? (
                                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white">
                                        <Users className="w-4 h-4" />
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {formData.assignedTo.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                      </div>
                                    )}
                                    <div>
                                      <div className="font-medium">{formData.assignedTo.name}</div>
                                      {formData.assignedTo.meta && (
                                        <div className="text-sm text-gray-500">{formData.assignedTo.meta}</div>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setFormData(prev => ({ ...prev, assignedTo: null }));
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <X className="w-4 h-4 text-gray-400" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-3 text-gray-500">
                                  <Plus className="w-5 h-5" />
                                  <span>Assign to team member or team</span>
                                </div>
                              )}
                            </button>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Project <span className="text-gray-400">(Optional)</span>
                            </label>
                            <button
                              onClick={() => openSearch('project')}
                              className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left"
                            >
                              {formData.project ? (
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center space-x-3">
                                    <Target className="w-5 h-5 text-blue-600" />
                                    <div>
                                      <div className="font-medium">{formData.project.name}</div>
                                      {formData.project.circle && (
                                        <div className="text-sm text-gray-500">{formData.project.circle}</div>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setFormData(prev => ({ ...prev, project: null, status: 'todo' }));
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <X className="w-4 h-4 text-gray-400" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-3 text-gray-500">
                                  <Plus className="w-5 h-5" />
                                  <span>Select project (or create standalone task)</span>
                                </div>
                              )}
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                              <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                              <select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {(() => {
                                  const statusOptions = formData.project?.statuses || ['todo', 'in-progress', 'complete'];
                                  
                                  return statusOptions.map(status => {
                                    const displayName = status === 'todo' ? 'To Do' 
                                      : status === 'in-progress' ? 'In Progress'
                                      : status === 'in-review' ? 'In Review'
                                      : status.split('-').map(word => 
                                          word.charAt(0).toUpperCase() + word.slice(1)
                                        ).join(' ');
                                    
                                    return (
                                      <option key={status} value={status}>
                                        {displayName}
                                      </option>
                                    );
                                  });
                                })()}
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {formData.type === 'activity' && (formData.isPrivate || formData.module) && (
                        <>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                              <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                              <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                              <select
                                value={formData.duration}
                                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="45">45 min</option>
                                <option value="60">1 hour</option>
                                <option value="90">1.5 hours</option>
                                <option value="120">2 hours</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <div className="grid grid-cols-3 gap-3">
                              {['low', 'medium', 'high'].map(priority => (
                                <button
                                  key={priority}
                                  onClick={() => setFormData(prev => ({ ...prev, priority }))}
                                  className={`p-3 border-2 rounded-lg transition-all capitalize font-medium ${
                                    formData.priority === priority
                                      ? priority === 'high' 
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : priority === 'medium' 
                                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                                          : 'border-blue-500 bg-blue-50 text-blue-700'
                                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                  }`}
                                >
                                  {priority}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {formData.type === 'activity' && formData.isPrivate && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Lock className="w-5 h-5 text-gray-600" />
                              <div>
                                <div className="font-medium">Private Activity</div>
                                <div className="text-sm text-gray-500">This activity will not be linked to any module</div>
                              </div>
                            </div>
                            <button
                              onClick={() => setFormData(prev => ({ ...prev, isPrivate: false }))}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              Change
                            </button>
                          </div>
                        </div>
                      )}

                      {formData.type === 'activity' && formData.module && (
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {(() => {
                                  const module = userModules.find(m => m.id === formData.module);
                                  const IconComponent = module?.icon || Settings;
                                  return (
                                    <>
                                      <div className={`p-2 rounded-lg ${module?.color || 'bg-gray-500'}`}>
                                        <IconComponent className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <div className="font-medium">{module?.name || formData.module}</div>
                                        <div className="text-sm text-gray-500">Activity will be created in this module</div>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                              <button
                                onClick={() => setFormData(prev => ({ ...prev, module: '', linkedItem: null }))}
                                className="text-sm text-blue-600 hover:text-blue-700"
                              >
                                Change
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {formData.module === 'projects' 
                                ? 'Link to Project Task'
                                : `Link to ${getLinkedItemLabel()}`
                              } <span className="text-gray-400">(Optional)</span>
                            </label>
                            <button
                              onClick={() => openSearch(getLinkedItemContext())}
                              className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left"
                            >
                              {formData.linkedItem ? (
                                <div className="flex items-center space-x-3">
                                  {formData.linkedItem.icon && <formData.linkedItem.icon className="w-5 h-5 text-blue-600" />}
                                  <div>
                                    <div className="font-medium">{formData.linkedItem.name}</div>
                                    {formData.linkedItem.meta && (
                                      <div className="text-sm text-gray-500">{formData.linkedItem.meta}</div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-3 text-gray-500">
                                  <Plus className="w-5 h-5" />
                                  <span>
                                    {formData.module === 'projects' 
                                      ? 'Search and select project task' 
                                      : `Search and select ${getLinkedItemLabel().toLowerCase()}`
                                    }
                                  </span>
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.title.trim() || !formData.type || (formData.type === 'activity' && !formData.isPrivate && !formData.module)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg disabled:shadow-none"
              >
                Create {formData.type === 'task' ? 'Task' : 'Activity'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Search {searchContext === 'project' ? 'Projects' : searchContext === 'user' ? 'Team Members' : searchContext === 'deal' ? 'Deals' : searchContext === 'ticket' ? 'Tickets' : searchContext === 'task' ? 'Tasks' : 'Items'}
                </h3>
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchContext === 'user' ? 'Search team members...' : searchContext === 'task' ? 'Search tasks...' : `Search ${searchContext}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {getSearchTabs().map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSearchTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      searchTab === tab
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              
              {searchTerm === '' && searchContext !== 'project' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchData.recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(search)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4">
                  {searchTerm ? 'Search Results' : `All ${searchTab}`}
                </h4>
                <div className="space-y-2">
                  {filteredResults.map(item => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={`${item.type}-${item.id}`}
                        onClick={() => selectSearchItem(item)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all text-left"
                      >
                        <div className="flex items-center space-x-3">
                          {item.type === 'user' ? (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {item.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </div>
                          ) : item.type === 'team' ? (
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white">
                              <Users className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">
                              {item.project && <span className="text-blue-600">{item.project}</span>}
                              {item.circle && <span className="text-blue-600">{item.circle}</span>}
                              {item.meta && <span> • {item.meta}</span>}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {filteredResults.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-2">No results found for "{searchTerm}"</div>
                      <div className="text-sm text-gray-500">Try adjusting your search terms</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskActivity; 