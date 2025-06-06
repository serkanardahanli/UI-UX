import React, { useState } from 'react';
import { 
  ChevronDown,
  DollarSign,
  Target,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  BarChart3,
  Users,
  Calendar,
  ArrowRight,
  Eye,
  Plus
} from 'lucide-react';

const SalesOverview = () => {
  const [selectedPipeline, setSelectedPipeline] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [viewAsChart, setViewAsChart] = useState(false);

  const pipelines = [
    { id: 'all', label: 'All Pipelines', deals: 84 },
    { id: 'netherlands', label: 'Pipeline Nederland', deals: 45 },
    { id: 'germany', label: 'Pipeline Duitsland', deals: 32 },
    { id: 'custom-1', label: 'Enterprise Deals', deals: 7 }
  ];

  const getCurrentPipeline = () => {
    return pipelines.find(p => p.id === selectedPipeline) || pipelines[0];
  };

  // Metrics data based on selected pipeline
  const getMetrics = () => {
    const baseMetrics = {
      all: {
        pipelineValue: 105000,
        activeDeals: 84,
        monthlyClosed: 15,
        winRate: 68
      },
      netherlands: {
        pipelineValue: 65000,
        activeDeals: 45,
        monthlyClosed: 9,
        winRate: 72
      },
      germany: {
        pipelineValue: 32000,
        activeDeals: 32,
        monthlyClosed: 5,
        winRate: 64
      },
      'custom-1': {
        pipelineValue: 8000,
        activeDeals: 7,
        monthlyClosed: 1,
        winRate: 85
      }
    };

    return baseMetrics[selectedPipeline] || baseMetrics.all;
  };

  const metrics = getMetrics();

  const salesMetrics = [
    { 
      label: 'Total Pipeline Value', 
      value: `€${metrics.pipelineValue.toLocaleString()}`, 
      change: '+18%', 
      icon: DollarSign, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      label: 'Active Deals', 
      value: metrics.activeDeals.toString(), 
      change: '+12', 
      icon: Target, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      label: 'Monthly Closed', 
      value: metrics.monthlyClosed.toString(), 
      change: '+3', 
      icon: CheckCircle, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    { 
      label: 'Win Rate', 
      value: `${metrics.winRate}%`, 
      change: '+5%', 
      icon: TrendingUp, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  // Pipeline stages data based on selected pipeline
  const getPipelineStages = () => {
    const stageData = {
      all: [
        { id: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-800', count: 24 },
        { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800', count: 18 },
        { id: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-800', count: 12 },
        { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-100 text-purple-800', count: 8 },
        { id: 'won', label: 'Won', color: 'bg-green-100 text-green-800', count: 15 },
        { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800', count: 7 }
      ],
      netherlands: [
        { id: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-800', count: 14 },
        { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800', count: 11 },
        { id: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-800', count: 8 },
        { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-100 text-purple-800', count: 5 },
        { id: 'won', label: 'Won', color: 'bg-green-100 text-green-800', count: 9 },
        { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800', count: 3 }
      ],
      germany: [
        { id: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-800', count: 8 },
        { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800', count: 6 },
        { id: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-800', count: 4 },
        { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-100 text-purple-800', count: 3 },
        { id: 'won', label: 'Won', color: 'bg-green-100 text-green-800', count: 5 },
        { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800', count: 3 }
      ],
      'custom-1': [
        { id: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-800', count: 2 },
        { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800', count: 1 },
        { id: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-800', count: 0 },
        { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-100 text-purple-800', count: 0 },
        { id: 'won', label: 'Won', color: 'bg-green-100 text-green-800', count: 1 },
        { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800', count: 1 }
      ]
    };

    return stageData[selectedPipeline] || stageData.all;
  };

  const pipelineStages = getPipelineStages();

  const quickActions = [
    { label: 'View List', icon: Eye, path: '/sales/list', color: 'bg-emerald-600 hover:bg-emerald-700' },
    { label: 'Board View', icon: BarChart3, path: '/sales/board', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Add Deal', icon: Plus, path: '/sales/new', color: 'bg-purple-600 hover:bg-purple-700' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sales Overview</h1>
            <p className="text-gray-600">Pipeline analytics and performance metrics</p>
          </div>
          
          {/* Pipeline Selector */}
          <div className="relative">
            <select 
              value={selectedPipeline}
              onChange={(e) => setSelectedPipeline(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none pr-10 bg-white min-w-48"
            >
              {pipelines.map((pipeline) => (
                <option key={pipeline.id} value={pipeline.id}>
                  {pipeline.label} ({pipeline.deals} deals)
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {salesMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`${metric.bgColor} ${metric.borderColor} border rounded-lg p-6`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <span className={`text-xs font-medium ${metric.color}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Breakdown */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Pipeline Breakdown - {getCurrentPipeline().label}
          </h3>
          <button 
            onClick={() => setViewAsChart(!viewAsChart)}
            className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {viewAsChart ? 'View as Cards' : 'View as Chart'}
          </button>
        </div>
        
        {!viewAsChart ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pipelineStages.map((stage) => (
              <div key={stage.id} className="text-center">
                <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${stage.color} mb-2`}>
                  {stage.label}
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stage.count}</p>
                <p className="text-xs text-gray-500">deals</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart view coming soon...</p>
          </div>
        )}
      </div>

      {/* Filters and Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search deals, companies, contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Stage Filter */}
            <div className="relative">
              <select 
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none pr-8"
              >
                <option value="all">All Stages</option>
                {pipelineStages.map((stage) => (
                  <option key={stage.id} value={stage.id}>{stage.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none pr-8"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button 
                  key={index}
                  className={`px-4 py-2 ${action.color} text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium`}
                >
                  <Icon className="w-4 h-4" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Performance (Future Enhancement Preview) */}
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-medium">
              EW
            </div>
            <div>
              <p className="font-medium text-gray-900">Emma Wilson</p>
              <p className="text-sm text-gray-500">€45,000 pipeline • 78% win rate</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              DS
            </div>
            <div>
              <p className="font-medium text-gray-900">David Smith</p>
              <p className="text-sm text-gray-500">€35,000 pipeline • 65% win rate</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
              LP
            </div>
            <div>
              <p className="font-medium text-gray-900">Lisa Park</p>
              <p className="text-sm text-gray-500">€25,000 pipeline • 72% win rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview; 