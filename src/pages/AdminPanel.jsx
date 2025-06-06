import React, { useState } from 'react';
import { 
  Settings, 
  ShoppingCart, 
  CreditCard, 
  Package, 
  BarChart3,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');

  const adminTabs = [
    { id: 'products', label: 'Product Page', icon: Package, color: 'text-orange-600' },
    { id: 'cancel-subscription', label: 'Cancel Subscription', icon: X, color: 'text-red-600' },
    { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard, color: 'text-indigo-600' },
    { id: 'settings', label: 'System Settings', icon: Settings, color: 'text-gray-600' }
  ];

  const products = [
    { 
      id: 1, 
      name: 'FlowQi Pro', 
      price: '€49/month', 
      status: 'active',
      sales: 156,
      revenue: '€7,644',
      description: 'Professional productivity suite for teams'
    },
    { 
      id: 2, 
      name: 'FlowQi Enterprise', 
      price: '€199/month', 
      status: 'active',
      sales: 23,
      revenue: '€4,577',
      description: 'Enterprise-grade solution with advanced features'
    },
    { 
      id: 3, 
      name: 'FlowQi Starter', 
      price: '€19/month', 
      status: 'active',
      sales: 89,
      revenue: '€1,691',
      description: 'Perfect for individuals and small teams'
    }
  ];

  const adminStats = [
    { label: 'Active Products', value: '3', change: 'All Active', icon: Package, color: 'text-blue-600' },
    { label: 'Total Sales', value: '268', change: '+15%', icon: ShoppingCart, color: 'text-green-600' },
    { label: 'Monthly Revenue', value: '€13,912', change: '+23%', icon: BarChart3, color: 'text-purple-600' },
    { label: 'System Health', value: '99.9%', change: 'Optimal', icon: CheckCircle, color: 'text-emerald-600' }
  ];

  const renderProductPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{product.name}</h4>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Price</span>
                <span className="font-medium text-gray-900">{product.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Sales</span>
                <span className="font-medium text-gray-900">{product.sales}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Revenue</span>
                <span className="font-medium text-gray-900">{product.revenue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {product.status}
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4 inline mr-1" />
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Eye className="w-4 h-4 inline mr-1" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCancelSubscription = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-red-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Cancel Subscription</h3>
            <p className="text-sm text-gray-600">This action cannot be undone</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">What happens when you cancel:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Immediate loss of access to premium features</li>
              <li>• Data will be archived (not deleted) for 30 days</li>
              <li>• You can reactivate within 30 days to restore full access</li>
              <li>• No refunds for current billing period</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for cancellation (optional)
            </label>
            <textarea 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              rows="3"
              placeholder="Help us improve by sharing your reason..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="confirm-cancel" className="rounded border-gray-300" />
            <label htmlFor="confirm-cancel" className="text-sm text-gray-700">
              I understand the consequences of canceling my subscription
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Cancel Subscription
          </button>
          <button className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Keep Subscription
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Visa •••• 4242</h4>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Primary
            </span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Edit
            </button>
            <button className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              Remove
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">MasterCard •••• 8888</h4>
                <p className="text-sm text-gray-500">Expires 08/26</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Set Primary
            </button>
            <button className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Billing Information</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>Next billing date: December 15, 2024</p>
          <p>Current plan: FlowQi Pro (€49/month)</p>
          <p>Payment method: Visa •••• 4242</p>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
              <p className="text-sm text-gray-500">Enable to perform system maintenance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Send system notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Debug Mode</h4>
              <p className="text-sm text-gray-500">Enable detailed error logging</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-4">Danger Zone</h4>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
              Reset All Settings
            </button>
            <button className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return renderProductPage();
      case 'cancel-subscription':
        return renderCancelSubscription();
      case 'payment-methods':
        return renderPaymentMethods();
      case 'settings':
        return renderSystemSettings();
      default:
        return renderProductPage();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Billing management and system administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <span className={`text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-100 mb-6">
        <div className="border-b border-gray-100">
          <nav className="flex overflow-x-auto">
            {adminTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 