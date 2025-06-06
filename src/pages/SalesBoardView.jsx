import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  MessageSquare,
  Calendar,
  Phone,
  CheckCircle,
  XCircle,
  User,
  Building,
  DollarSign,
  Clock,
  AlertCircle,
  Flame,
  ChevronDown,
  Tag
} from 'lucide-react';

const SalesBoardView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPipeline, setSelectedPipeline] = useState('main');
  const [selectedOwner, setSelectedOwner] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [draggedDeal, setDraggedDeal] = useState(null);

  // Pipeline stages
  const stages = [
    { 
      id: 'lead', 
      label: 'Lead', 
      color: 'bg-gray-50 border-gray-200', 
      headerColor: 'bg-gray-100 text-gray-700',
      count: 24 
    },
    { 
      id: 'qualified', 
      label: 'Qualified', 
      color: 'bg-blue-50 border-blue-200', 
      headerColor: 'bg-blue-100 text-blue-700',
      count: 18 
    },
    { 
      id: 'proposal', 
      label: 'Proposal', 
      color: 'bg-orange-50 border-orange-200', 
      headerColor: 'bg-orange-100 text-orange-700',
      count: 12 
    },
    { 
      id: 'negotiation', 
      label: 'Negotiation', 
      color: 'bg-purple-50 border-purple-200', 
      headerColor: 'bg-purple-100 text-purple-700',
      count: 8 
    },
    { 
      id: 'won', 
      label: 'Won', 
      color: 'bg-green-50 border-green-200', 
      headerColor: 'bg-green-100 text-green-700',
      count: 15 
    },
    { 
      id: 'lost', 
      label: 'Lost', 
      color: 'bg-red-50 border-red-200', 
      headerColor: 'bg-red-100 text-red-700',
      count: 7 
    }
  ];

  // Sample deals data
  const deals = [
    {
      id: 1,
      name: 'FlowQi Enterprise',
      company: 'TechCorp Solutions',
      value: 25000,
      probability: 80,
      stage: 'negotiation',
      priority: 'high',
      owner: 'Emma Wilson',
      lastActivity: '2h ago',
      activityType: 'email',
      isRotting: false,
      tags: ['Enterprise', 'Q4 Target'],
      closeDate: '2024-12-20'
    },
    {
      id: 2,
      name: 'FlowQi Pro',
      company: 'StartupXYZ',
      value: 12000,
      probability: 60,
      stage: 'proposal',
      priority: 'medium',
      owner: 'David Smith',
      lastActivity: '1d ago',
      activityType: 'call',
      isRotting: false,
      tags: ['Startup'],
      closeDate: '2024-12-15'
    },
    {
      id: 3,
      name: 'FlowQi Starter',
      company: 'LocalBiz Ltd',
      value: 5000,
      probability: 40,
      stage: 'qualified',
      priority: 'low',
      owner: 'Lisa Park',
      lastActivity: '3d ago',
      activityType: 'meeting',
      isRotting: false,
      tags: ['Small Business'],
      closeDate: '2024-12-30'
    },
    {
      id: 4,
      name: 'FlowQi Enterprise Plus',
      company: 'BigCorp Industries',
      value: 45000,
      probability: 90,
      stage: 'won',
      priority: 'high',
      owner: 'Emma Wilson',
      lastActivity: '1w ago',
      activityType: 'contract',
      isRotting: false,
      tags: ['Enterprise', 'Closed'],
      closeDate: '2024-11-28'
    },
    {
      id: 5,
      name: 'FlowQi Pro',
      company: 'MediumCorp',
      value: 18000,
      probability: 20,
      stage: 'lead',
      priority: 'medium',
      owner: 'David Smith',
      lastActivity: '5d ago',
      activityType: 'email',
      isRotting: true,
      tags: ['Follow-up'],
      closeDate: '2025-01-15'
    },
    {
      id: 6,
      name: 'FlowQi Basic',
      company: 'SmallCorp',
      value: 3000,
      probability: 30,
      stage: 'qualified',
      priority: 'low',
      owner: 'Lisa Park',
      lastActivity: '2d ago',
      activityType: 'demo',
      isRotting: false,
      tags: ['Demo Scheduled'],
      closeDate: '2025-01-10'
    }
  ];

  const owners = ['Emma Wilson', 'David Smith', 'Lisa Park'];

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'bg-green-500';
    if (probability >= 60) return 'bg-yellow-500';
    if (probability >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'email': return '📧';
      case 'call': return '📞';
      case 'meeting': return '🤝';
      case 'demo': return '🖥️';
      case 'contract': return '📄';
      default: return '💬';
    }
  };

  const getOwnerInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOwner = selectedOwner === 'all' || deal.owner === selectedOwner;
    const matchesPriority = selectedPriority === 'all' || deal.priority === selectedPriority;
    
    return matchesSearch && matchesOwner && matchesPriority;
  });

  // Group deals by stage
  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = filteredDeals.filter(deal => deal.stage === stage.id);
    return acc;
  }, {});

  // Drag and Drop handlers
  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    if (draggedDeal && draggedDeal.stage !== targetStage) {
      // In a real app, you would update the deal's stage in your state/API
      console.log(`Moving deal ${draggedDeal.id} from ${draggedDeal.stage} to ${targetStage}`);
    }
    setDraggedDeal(null);
  };

  // Deal Card Component - Optimized compact version
  const DealCard = ({ deal }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, deal)}
      className="bg-white rounded-lg border border-gray-200 p-3 mb-2 shadow-sm hover:shadow-md transition-all cursor-move group"
    >
      {/* Compact Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm truncate leading-tight">{deal.name}</h4>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <Building className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{deal.company}</span>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Value and Probability - More compact */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-gray-900 text-sm">
          {formatCurrency(deal.value)}
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${getProbabilityColor(deal.probability)}`}></div>
          <span className="text-xs text-gray-600">{deal.probability}%</span>
        </div>
      </div>

      {/* Compact Tags Row */}
      <div className="flex items-center gap-1 mb-2">
        <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getPriorityColor(deal.priority)}`}>
          {deal.priority.charAt(0).toUpperCase()}
        </span>
        {deal.tags.slice(0, 1).map((tag, index) => (
          <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs truncate max-w-20">
            {tag}
          </span>
        ))}
        {deal.tags.length > 1 && (
          <span className="text-xs text-gray-400 font-medium">+{deal.tags.length - 1}</span>
        )}
      </div>

      {/* Bottom Row - Owner and Activity */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
            {getOwnerInitials(deal.owner)}
          </div>
          <span className="text-gray-600 truncate max-w-16">{deal.owner.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          {deal.isRotting && <Flame className="w-3 h-3 text-red-500" />}
          <span className="text-xs">{getActivityIcon(deal.activityType)}</span>
          <span className="text-xs">{deal.lastActivity}</span>
        </div>
      </div>

      {/* Compact Quick Actions - Grid layout */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 pt-2 border-t border-gray-100">
        <div className="grid grid-cols-6 gap-1">
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 flex justify-center">
            <Edit className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 flex justify-center">
            <MessageSquare className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 flex justify-center">
            <Calendar className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 flex justify-center">
            <Phone className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-green-100 rounded text-gray-400 hover:text-green-600 flex justify-center">
            <CheckCircle className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 flex justify-center">
            <XCircle className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* Compact Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Sales Board</h1>
        <p className="text-gray-600 text-sm">Visual pipeline with drag & drop deal management</p>
      </div>

      {/* Sticky Filters - Optimized for mobile */}
      <div className="bg-white rounded-lg border border-gray-100 p-3 mb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex flex-col gap-3">
          {/* Top row - Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search deals, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
            />
          </div>

          {/* Bottom row - Filters and Add button */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Pipeline Selector */}
            <div className="relative flex-shrink-0">
              <select 
                value={selectedPipeline}
                onChange={(e) => setSelectedPipeline(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none pr-7 text-sm bg-white"
              >
                <option value="main">Main Pipeline</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>

            {/* Owner Filter */}
            <div className="relative flex-shrink-0">
              <select 
                value={selectedOwner}
                onChange={(e) => setSelectedOwner(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none pr-7 text-sm bg-white"
              >
                <option value="all">All Owners</option>
                {owners.map((owner) => (
                  <option key={owner} value={owner}>{owner.split(' ')[0]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>

            {/* Priority Filter */}
            <div className="relative flex-shrink-0">
              <select 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none pr-7 text-sm bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>

            <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5 text-sm font-medium flex-shrink-0">
              <Plus className="w-3 h-3" />
              Add Deal
            </button>
          </div>
        </div>
      </div>

      {/* Optimized Board Columns - Responsive width */}
      <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: '70vh' }}>
        {stages.map((stage) => (
          <div 
            key={stage.id}
            className="flex-shrink-0 w-70 lg:w-64 xl:w-70"
            style={{ width: '280px', minWidth: '240px' }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Compact Column Header */}
            <div className={`${stage.headerColor} rounded-t-lg px-3 py-2 border-b`}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">{stage.label}</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">{dealsByStage[stage.id]?.length || 0}</span>
                  <span className="opacity-70 hidden sm:inline">
                    {dealsByStage[stage.id]?.reduce((sum, deal) => sum + deal.value, 0) 
                      ? formatCurrency(dealsByStage[stage.id].reduce((sum, deal) => sum + deal.value, 0))
                      : '€0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Column Content - Optimized spacing */}
            <div className={`${stage.color} rounded-b-lg border-l border-r border-b min-h-96 p-2`}>
              {dealsByStage[stage.id]?.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
              
              {/* Compact Add Deal Button */}
              <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-1.5 text-sm">
                <Plus className="w-3 h-3" />
                Add Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesBoardView; 