import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Users, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Star, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  RefreshCw,
  FileText,
  Target,
  Heart,
  Package
} from 'lucide-react';
import CreateTaskActivity from '../components/CreateTaskActivity';

interface PersonalDashboardProps {
  setCurrentView?: (view: string) => void;
}

type PeriodType = 'today' | 'week' | 'month' | 'quarter';
type TabType = 0 | 1 | 2 | 3;

export default function PersonalDashboard({ setCurrentView }: PersonalDashboardProps) {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  const [activeTab, setActiveTab] = useState<TabType>(0);
  const [noteText, setNoteText] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [savedNotes, setSavedNotes] = useState([
    {
      id: 1,
      text: 'Call supplier about delayed shipment',
      timestamp: 'Today at 9:15 AM',
      reminder: 'Tomorrow'
    },
    {
      id: 2,
      text: 'Review Q3 budget proposal before meeting',
      timestamp: 'Yesterday at 4:30 PM',
      reminder: null
    }
  ]);

  // CreateTaskActivity popup state management
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [createPopupType, setCreatePopupType] = useState('');

  const periodLabels = {
    today: {
      revenue: '€84.2k',
      newCustomers: 37,
      openDeals: 156,
      quotes: 42,
      conversion: '24.8%',
      winRate: '72%'
    },
    week: {
      revenue: '€387.5k',
      newCustomers: 142,
      openDeals: 156,
      quotes: 186,
      conversion: '26.1%',
      winRate: '68%'
    },
    month: {
      revenue: '€1.45M',
      newCustomers: 521,
      openDeals: 156,
      quotes: 734,
      conversion: '22.4%',
      winRate: '74%'
    },
    quarter: {
      revenue: '€4.12M',
      newCustomers: 1547,
      openDeals: 156,
      quotes: 2104,
      conversion: '28.9%',
      winRate: '71%'
    }
  };

  const activities = [
    {
      id: 1,
      icon: Phone,
      title: 'Call Customer Y',
      meta: ['Follow up on proposal', 'High Priority'],
      time: '10:00 AM',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      icon: Users,
      title: 'Meeting with Customer Y',
      meta: ['Project kickoff', 'Conference Room A'],
      time: '2:30 PM',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    },
    {
      id: 3,
      icon: Mail,
      title: 'Send proposal to ABC Corp',
      meta: ['Updated pricing', 'Deal #1234'],
      time: '4:00 PM',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      id: 4,
      icon: CheckCircle,
      title: 'Complete project milestone',
      meta: ['Website Redesign', 'Phase 2'],
      time: '5:00 PM',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 5,
      icon: DollarSign,
      title: 'Review budget allocation',
      meta: ['Q3 Planning', 'Finance Team'],
      time: '5:30 PM',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  const tasks = [
    {
      id: 1,
      icon: AlertCircle,
      title: 'Update project documentation',
      meta: ['Overdue by 2 days', 'High Priority'],
      time: 'Due: Jul 6',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: 2,
      icon: Star,
      title: 'Review code changes',
      meta: ['Pull request #234', 'Medium Priority'],
      time: 'Due: Today',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 3,
      icon: FileText,
      title: 'Prepare monthly report',
      meta: ['Marketing Dashboard', 'Low Priority'],
      time: 'Due: Jul 15',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  const deals = [
    {
      id: 1,
      icon: Clock,
      title: 'ABC Corp - Enterprise License',
      meta: ['€125,000', 'Closing Today'],
      time: '90% probability',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 2,
      icon: Heart,
      title: 'TechStart Inc - SaaS Package',
      meta: ['€45,000', 'Negotiation'],
      time: '65% probability',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 3,
      icon: Package,
      title: 'Global Systems - Pilot Project',
      meta: ['€15,000', 'Proposal Sent'],
      time: '40% probability',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
         }
   ];

   // Update time every minute
   useEffect(() => {
     const timer = setInterval(() => {
       setCurrentTime(new Date());
     }, 60000);
     return () => clearInterval(timer);
   }, []);

   const getGreeting = () => {
     const hour = currentTime.getHours();
     if (hour < 12) return 'Good morning';
     if (hour < 17) return 'Good afternoon';
     return 'Good evening';
   };

   const getCurrentDate = () => {
     const options: Intl.DateTimeFormatOptions = { 
       weekday: 'long', 
       year: 'numeric', 
       month: 'long', 
       day: 'numeric' 
     };
     return currentTime.toLocaleDateString('en-US', options);
   };

   const saveNote = () => {
    if (noteText.trim()) {
      const now = new Date();
      const timestamp = `Today at ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
      
      let reminderText = null;
      if (reminderDate) {
        const reminder = new Date(reminderDate);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        reminderText = reminder.toLocaleDateString('en-US', options);
      }

      const newNote = {
        id: Date.now(),
        text: noteText,
        timestamp,
        reminder: reminderText
      };

      setSavedNotes([newNote, ...savedNotes]);
      setNoteText('');
      setReminderDate('');
    }
  };

  // Functions for popup management
  const openCreatePopup = (type = 'activity') => {
    setCreatePopupType(type);
    setShowCreatePopup(true);
  };

  const closeCreatePopup = () => {
    setShowCreatePopup(false);
    setCreatePopupType('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div>
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 border border-gray-200 rounded-lg mb-3 hover:border-purple-500 hover:bg-gray-50 cursor-pointer transition-all">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${activity.iconBg}`}>
                  <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{activity.title}</div>
                  <div className="text-xs text-gray-500 flex gap-4">
                    {activity.meta.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 ml-auto">{activity.time}</div>
              </div>
            ))}
            <div className="text-center py-5 text-gray-500 text-sm border-t border-gray-200 mt-5">
              Showing 6 of 12 activities for today • <a href="#" className="text-purple-600 hover:text-purple-700">View all</a>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center p-4 border border-gray-200 rounded-lg mb-3 hover:border-purple-500 hover:bg-gray-50 cursor-pointer transition-all">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${task.iconBg}`}>
                  <task.icon className={`w-5 h-5 ${task.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{task.title}</div>
                  <div className="text-xs text-gray-500 flex gap-4">
                    {task.meta.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 ml-auto">{task.time}</div>
              </div>
            ))}
            <div className="text-center py-5 text-gray-500 text-sm border-t border-gray-200 mt-5">
              Showing 3 of 12 tasks • 5 overdue
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center py-20 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No active projects</p>
          </div>
        );
      case 3:
        return (
          <div>
            {deals.map((deal) => (
              <div key={deal.id} className="flex items-center p-4 border border-gray-200 rounded-lg mb-3 hover:border-purple-500 hover:bg-gray-50 cursor-pointer transition-all">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${deal.iconBg}`}>
                  <deal.icon className={`w-5 h-5 ${deal.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{deal.title}</div>
                  <div className="text-xs text-gray-500 flex gap-4">
                    {deal.meta.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 ml-auto">{deal.time}</div>
              </div>
            ))}
            <div className="text-center py-5 text-gray-500 text-sm border-t border-gray-200 mt-5">
              Total pipeline value: €185,000 • Average close rate: 65%
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 max-w-[1600px] mx-auto p-5">


        {/* Main Content */}
        <main className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Content Header */}
          <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-400 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold mb-2">{getGreeting()}, Serkan!</h1>
                <p className="opacity-90">{getCurrentDate()}</p>
              </div>
              <button 
                onClick={() => openCreatePopup()}
                className="px-4 py-2 text-sm font-medium bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create +
              </button>
            </div>
          </div>

          {/* Period Filter and Stats */}
          <div className="p-4 lg:p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
              <div className="flex items-center gap-6 mb-4 lg:mb-0">
                <h3 className="text-base font-semibold">Overview</h3>
                <div className="flex bg-gray-200 rounded-lg p-0.5">
                  {(['today', 'week', 'month', 'quarter'] as PeriodType[]).map((period) => (
                    <button
                      key={period}
                      onClick={() => setActivePeriod(period)}
                      className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                        activePeriod === period
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {period === 'today' ? 'Today' : 
                       period === 'week' ? 'This Week' : 
                       period === 'month' ? 'This Month' : 'This Quarter'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Compact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{periodLabels[activePeriod].revenue}</div>
                <div className="text-xs text-gray-600">Revenue</div>
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{periodLabels[activePeriod].newCustomers}</div>
                <div className="text-xs text-gray-600">New Customers</div>
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  24%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{periodLabels[activePeriod].openDeals}</div>
                <div className="text-xs text-gray-600">Open Deals</div>
                <div className="text-xs text-red-600 flex items-center justify-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  8%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{periodLabels[activePeriod].quotes}</div>
                <div className="text-xs text-gray-600">Quotes Sent</div>
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  18%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{periodLabels[activePeriod].conversion}</div>
                <div className="text-xs text-gray-600">Conversion</div>
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  3.2%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{periodLabels[activePeriod].winRate}</div>
                <div className="text-xs text-gray-600">Win Rate</div>
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  5%
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex-1 flex flex-col px-6">
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {['My Activities', 'My Tasks', 'My Projects', 'My Deals'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index as TabType)}
                  className={`py-3 text-sm relative transition-colors ${
                    activeTab === index
                      ? 'text-purple-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {activeTab === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto pb-6">
              {renderTabContent()}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          {/* Today's Overview Widget */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold">Today's Overview</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3 pb-4 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-xs text-gray-600">Tasks Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-xs text-gray-600">Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-xs text-gray-600">Open Deals</div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">Tasks Overdue</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-red-600">5</span>
                  <span className="text-xs text-gray-600">need attention</span>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">Due This Period</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-yellow-600">18</span>
                  <span className="text-xs text-gray-600">upcoming deadlines</span>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">Deals Closing Soon</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-green-600">3</span>
                  <span className="text-xs text-gray-600">worth €45,000</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="text-xs text-gray-600 mb-2">Win Rate This Period</div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-purple-600">72%</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[72%] h-full bg-purple-600 rounded-full transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notes Widget */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold">Quick Notes</h3>
            </div>
            
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full min-h-[80px] p-2.5 border border-gray-200 rounded-lg text-xs resize-none focus:border-purple-500 focus:outline-none"
              placeholder="Type your note here..."
            />
            
            <div className="flex justify-between mt-2.5">
              <input
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="px-2.5 py-1.5 border border-gray-200 rounded-md text-xs"
              />
              <button
                onClick={saveNote}
                className="px-3.5 py-1.5 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700 transition-colors"
              >
                Save Note
              </button>
            </div>
            
            <div className="mt-3 max-h-40 overflow-y-auto">
              {savedNotes.map((note) => (
                <div key={note.id} className="p-2.5 rounded-md bg-gray-50 mb-2 text-xs">
                  <div>{note.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {note.timestamp}
                    {note.reminder && ` • Reminder: ${note.reminder}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* CreateTaskActivity Popup */}
      {showCreatePopup && (
        <CreateTaskActivity
          isOpen={showCreatePopup}
          onClose={closeCreatePopup}
          initialType={createPopupType}
        />
      )}
    </div>
  );
} 