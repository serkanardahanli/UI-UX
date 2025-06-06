import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  MoreHorizontal,
  Calendar,
  User,
  Mail,
  Building,
  ChevronDown,
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react';

const SalesListView = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const salesStages = [
    { id: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-800' },
    { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800' },
    { id: 'proposal', label: 'Proposal', color: 'bg-orange-100 text-orange-800' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-purple-100 text-purple-800' },
    { id: 'won', label: 'Won', color: 'bg-green-100 text-green-800' },
    { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800' }
  ];

  const deals = [
    {
      id: 1,
      name: 'FlowQi Enterprise - TechCorp',
      company: 'TechCorp Solutions',
      contact: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      value: 25000,
      stage: 'negotiation',
      priority: 'high',
      probability: 80,
      closeDate: '2024-12-20',
      assignedTo: 'Emma Wilson'
    },
    {
      id: 2,
      name: 'FlowQi Pro - StartupXYZ',
      company: 'StartupXYZ',
      contact: 'Michael Chen',
      email: 'michael@startupxyz.com',
      value: 12000,
      stage: 'proposal',
      priority: 'medium',
      probability: 60,
      closeDate: '2024-12-15',
      assignedTo: 'David Smith'
    },
    {
      id: 3,
      name: 'FlowQi Starter - LocalBiz',
      company: 'LocalBiz Ltd',
      contact: 'Anna Rodriguez',
      email: 'anna@localbiz.nl',
      value: 5000,
      stage: 'qualified',
      priority: 'low',
      probability: 40,
      closeDate: '2024-12-30',
      assignedTo: 'Lisa Park'
    },
    {
      id: 4,
      name: 'FlowQi Enterprise - BigCorp',
      company: 'BigCorp Industries',
      contact: 'James Wilson',
      email: 'james@bigcorp.com',
      value: 45000,
      stage: 'won',
      priority: 'high',
      probability: 100,
      closeDate: '2024-11-28',
      assignedTo: 'Emma Wilson'
    },
    {
      id: 5,
      name: 'FlowQi Pro - MediumCorp',
      company: 'MediumCorp',
      contact: 'Sophie Turner',
      email: 'sophie@mediumcorp.eu',
      value: 18000,
      stage: 'lead',
      priority: 'medium',
      probability: 20,
      closeDate: '2025-01-15',
      assignedTo: 'David Smith'
    }
  ];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStageInfo = (stage) => {
    return salesStages.find(s => s.id === stage) || salesStages[0];
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
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || deal.stage === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || deal.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDeal = (dealId) => {
    if (onNavigate) {
      onNavigate(`/sales/deal/${dealId}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sales Pipeline</h1>
        <p className="text-gray-600">Manage and track your sales deals and opportunities</p>
      </div>

      {/* Filters and Actions */}
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

            {/* Status Filter */}
            <div className="relative">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none pr-8"
              >
                <option value="all">All Stages</option>
                {salesStages.map((stage) => (
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

          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Deal
          </button>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deal & Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value & Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeals.map((deal) => {
                const stageInfo = getStageInfo(deal.stage);
                return (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    {/* Deal & Company */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div 
                          className="font-medium text-gray-900 hover:text-emerald-600 cursor-pointer transition-colors"
                          onClick={() => handleViewDeal(deal.id)}
                        >
                          {deal.name}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Building className="w-3 h-3" />
                          {deal.company}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <User className="w-3 h-3" />
                          {deal.contact}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          {deal.email}
                        </div>
                      </div>
                    </td>

                    {/* Value & Probability */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{formatCurrency(deal.value)}</div>
                        <div className="text-sm text-gray-500">{deal.probability}% probability</div>
                      </div>
                    </td>

                    {/* Stage */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageInfo.color}`}>
                        {stageInfo.label}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(deal.priority)}
                        <span className="text-sm capitalize">{deal.priority}</span>
                      </div>
                    </td>

                    {/* Close Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Calendar className="w-3 h-3" />
                        {formatDate(deal.closeDate)}
                      </div>
                    </td>

                    {/* Assigned To */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {deal.assignedTo.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-gray-900">{deal.assignedTo}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDeal(deal.id)}
                          className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                          title="View Deal"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600" title="Edit Deal">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600" title="More options">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Results Summary */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Showing {filteredDeals.length} of {deals.length} deals
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesListView;