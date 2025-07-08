import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Users,
  CheckCircle,
  DollarSign,
  AlertCircle,
  Star,
  FileText,
  Target,
  Heart,
  Package,
  Calendar,
  Settings,
  Lightbulb,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react';
import CreateTaskActivity from '../components/CreateTaskActivity';

interface PersonalDashboardProps {
  setCurrentView: (view: string) => void;
}

type PeriodType = 'today' | 'week' | 'month' | 'quarter';
type TabType = 0 | 1 | 2 | 3;

interface Filter {
  id: string;
  type: 'completion' | 'start-date' | 'due-date';
  value: string | Date | null;
  label: string;
}

export default function PersonalDashboard({ setCurrentView }: PersonalDashboardProps) {
  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  const [filters, setFilters] = useState<Filter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>(0);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [createPopupType, setCreatePopupType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
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
      date: new Date(), // Today
      completed: false,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      icon: Users,
      title: 'Meeting with Customer Y',
      meta: ['Project kickoff', 'Conference Room A'],
      time: '2:30 PM',
      date: new Date(), // Today
      completed: true,
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    },
    {
      id: 3,
      icon: Mail,
      title: 'Send proposal to ABC Corp',
      meta: ['Updated pricing', 'Deal #1234'],
      time: '4:00 PM',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      completed: false,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      id: 4,
      icon: CheckCircle,
      title: 'Complete project milestone',
      meta: ['Website Redesign', 'Phase 2'],
      time: '5:00 PM',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      completed: true,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 5,
      icon: DollarSign,
      title: 'Review budget allocation',
      meta: ['Q3 Planning', 'Finance Team'],
      time: '5:30 PM',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      completed: false,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 6,
      icon: Users,
      title: 'Team standup meeting',
      meta: ['Weekly sync', 'Development Team'],
      time: '9:00 AM',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      completed: true,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const tasks = [
    {
      id: 1,
      icon: AlertCircle,
      title: 'Update project documentation',
      meta: ['Overdue by 2 days', 'High Priority'],
      time: 'Due: Jul 6',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
      completed: false,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: 2,
      icon: Star,
      title: 'Review code changes',
      meta: ['Pull request #234', 'Medium Priority'],
      time: 'Due: Today',
      dueDate: new Date(), // Today
      completed: false,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 3,
      icon: FileText,
      title: 'Prepare monthly report',
      meta: ['Marketing Dashboard', 'Low Priority'],
      time: 'Due: Jul 15',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      completed: false,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 4,
      icon: Target,
      title: 'Plan Q4 objectives',
      meta: ['Strategic planning', 'High Priority'],
      time: 'Due: Jul 20',
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // Later this month
      completed: true,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 5,
      icon: Settings,
      title: 'Optimize database queries',
      meta: ['Performance improvement', 'Medium Priority'],
      time: 'No due date',
      dueDate: null, // No due date
      completed: false,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      id: 6,
      icon: Lightbulb,
      title: 'Research new technologies',
      meta: ['Innovation project', 'Low Priority'],
      time: 'No due date',
      dueDate: null, // No due date
      completed: true,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const deals = [
    {
      id: 1,
      icon: Clock,
      title: 'ABC Corp - Enterprise License',
      meta: ['€125,000', 'Closing Today'],
      time: '90% probability',
      closeDate: new Date(), // Today
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 2,
      icon: Heart,
      title: 'TechStart Inc - SaaS Package',
      meta: ['€45,000', 'Negotiation'],
      time: '65% probability',
      closeDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 3,
      icon: Package,
      title: 'Global Systems - Pilot Project',
      meta: ['€15,000', 'Proposal Sent'],
      time: '40% probability',
      closeDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
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
  const openCreatePopup = (type = '') => {
    setCreatePopupType('');
    setShowCreatePopup(true);
  };

  const closeCreatePopup = () => {
    setShowCreatePopup(false);
    setCreatePopupType('');
  };

  // Quick filter functions
  const addQuickFilter = (type: string, value: string, label: string) => {
    // Check if filter already exists
    const existingFilter = filters.find(f => f.type === type && f.value === value);
    
    if (existingFilter) {
      // Remove the filter (toggle off)
      setFilters(filters.filter(f => f.id !== existingFilter.id));
    } else {
      // Add the filter (toggle on)
      const newFilter: Filter = {
        id: Date.now().toString(),
        type: type as 'completion' | 'start-date' | 'due-date',
        value: value,
        label: label
      };
      setFilters([...filters, newFilter]);
    }
  };

  const isFilterActive = (type: string, value: string) => {
    return filters.some(f => f.type === type && f.value === value);
  };

  const removeFilter = (filterId: string) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  const addDateFilter = (type: 'start-date' | 'due-date', date: Date) => {
    const label = type === 'start-date' ? `Start date: ${date.toLocaleDateString()}` : `Due date: ${date.toLocaleDateString()}`;
    const newFilter: Filter = {
      id: Date.now().toString(),
      type: type,
      value: date,
      label: label
    };
    setFilters([...filters, newFilter]);
  };

  // New comprehensive filtering function
  const applyFilters = (items: any[], dateProperty: string) => {
    return items.filter(item => {
      // If no filters, show all items
      if (filters.length === 0) return true;

      // Apply each filter
      return filters.every(filter => {
        switch (filter.type) {
          case 'completion':
            if (filter.value === 'completed') {
              return item.completed === true;
            }
            if (filter.value === 'incomplete') {
              return item.completed !== true;
            }
            if (filter.value === 'overdue') {
              return item[dateProperty] && new Date(item[dateProperty]) < new Date();
            }
            if (filter.value === 'no-due-date') {
              return !item[dateProperty];
            }
            return true;
          
          case 'start-date':
            if (filter.value && item.date) {
              return new Date(item.date) >= new Date(filter.value as Date);
            }
            return true;
          
          case 'due-date':
            if (filter.value && item[dateProperty]) {
              return new Date(item[dateProperty]) <= new Date(filter.value as Date);
            }
            return true;
          
          default:
            return true;
        }
      });
    });
  };

  // Function to check if a date falls within the selected period (for sales data)
  const isWithinPeriod = (date: Date, period: PeriodType): boolean => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const itemDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    switch (period) {
      case 'today':
        return itemDate.getTime() === today.getTime();

      case 'week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)
        return itemDate >= startOfWeek && itemDate <= endOfWeek;

      case 'month':
        return itemDate.getFullYear() === today.getFullYear() &&
               itemDate.getMonth() === today.getMonth();

      case 'quarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        const itemQuarter = Math.floor(itemDate.getMonth() / 3);
        return itemDate.getFullYear() === today.getFullYear() &&
               itemQuarter === currentQuarter;

      default:
        return true;
    }
  };

  // Function to check if an activity/task falls within the selected activity period
  const isWithinActivityPeriod = (date: Date | null, period: ActivityPeriodType): boolean => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const itemDate = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : null;

    switch (period) {
      case 'today':
        return itemDate ? itemDate.getTime() === today.getTime() : false;

      case 'no-due-date':
        return !itemDate; // True if no date is selected

      case 'this-week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)
        return itemDate ? itemDate >= startOfWeek && itemDate <= endOfWeek : false;

      case 'next-week':
        const startOfNextWeek = new Date(today);
        startOfNextWeek.setDate(today.getDate() - today.getDay() + 7); // Start of next week
        const endOfNextWeek = new Date(startOfNextWeek);
        endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // End of next week
        return itemDate ? itemDate >= startOfNextWeek && itemDate <= endOfNextWeek : false;

      case 'overdue':
        return itemDate ? itemDate < today : false;

      case 'custom':
        if (!selectedDate) return false;
        const customDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        // Show all tasks up to the selected date, plus overdue and no due date
        if (!itemDate) return true; // No due date - always show
        return itemDate <= customDate;

      case 'all':
        return true;

      default:
        return true;
    }
  };

  const renderTabContent = () => {
    // Apply filters to data
    const filteredActivities = applyFilters(activities, 'date');
    const filteredTasks = applyFilters(tasks, 'dueDate');
    const filteredDeals = applyFilters(deals, 'closeDate');

    switch (activeTab) {
      case 0:
        return (
          <div>
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 border border-gray-200 rounded-lg mb-3 hover:border-purple-500 hover:bg-gray-50 cursor-pointer transition-all">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${activity.iconBg}`}>
                  <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1 flex items-center gap-2">
                    {activity.title}
                    {activity.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="text-xs text-gray-500 flex gap-4">
                    {activity.meta.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 ml-auto">{activity.time}</div>
              </div>
            ))}
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No activities match your filters</p>
              </div>
            ) : (
              <div className="text-center py-5 text-gray-500 text-sm border-t border-gray-200 mt-5">
                {filteredActivities.length} of {activities.length} activities • <a href="#" className="text-purple-600 hover:text-purple-700">View all</a>
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            {filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center p-4 border border-gray-200 rounded-lg mb-3 hover:border-purple-500 hover:bg-gray-50 cursor-pointer transition-all">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${task.iconBg}`}>
                  <task.icon className={`w-5 h-5 ${task.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1 flex items-center gap-2">
                    {task.title}
                    {task.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="text-xs text-gray-500 flex gap-4">
                    {task.meta.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 ml-auto">{task.time}</div>
              </div>
            ))}
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No tasks match your filters</p>
              </div>
            ) : (
              <div className="text-center py-5 text-gray-500 text-sm border-t border-gray-200 mt-5">
                {filteredTasks.length} of {tasks.length} tasks
              </div>
            )}
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
            {filteredDeals.map((deal) => (
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
            {filteredDeals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No deals match your filters</p>
              </div>
            ) : (
              <div className="text-center py-5 text-gray-500 text-sm border-t border-gray-200 mt-5">
                Total pipeline value: €185,000 • Average closing probability: 65%
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleTodayClick = () => {
    setActiveActivityPeriod('today');
    setShowCalendar(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setActiveActivityPeriod('custom');
    setShowCalendar(false);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showCalendar && !target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

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
            {/* Filter Button */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Filters</span>
                  {filters.length > 0 && (
                    <span className="px-2 py-1 text-xs bg-purple-600 text-white rounded-full">
                      {filters.length}
                    </span>
                  )}
                  <X className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-45' : ''}`} />
                </button>
                
                {filters.length > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Collapsible Filter Section */}
              {showFilters && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {/* Quick Filters */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Quick filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'incomplete', label: 'Incomplete tasks' },
                        { value: 'completed', label: 'Completed tasks' },
                        { value: 'overdue', label: 'Overdue' },
                        { value: 'no-due-date', label: 'No due date' }
                      ].map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => addQuickFilter('completion', filter.value, filter.label)}
                          className={`px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors ${
                            isFilterActive('completion', filter.value)
                              ? 'bg-purple-100 text-purple-800'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Filters */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Advanced filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {/* Start Date Filter */}
                      <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Start date</span>
                        <input
                          type="date"
                          onChange={(e) => {
                            if (e.target.value) {
                              addDateFilter('start-date', new Date(e.target.value));
                            }
                          }}
                          className="text-sm border-none outline-none bg-transparent"
                        />
                      </div>

                      {/* Due Date Filter */}
                      <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Due date</span>
                        <input
                          type="date"
                          onChange={(e) => {
                            if (e.target.value) {
                              addDateFilter('due-date', new Date(e.target.value));
                            }
                          }}
                          className="text-sm border-none outline-none bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Applied Filters */}
              {filters.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <div
                        key={filter.id}
                        className="inline-flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full"
                      >
                        {filter.label}
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="ml-2 hover:text-purple-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex border-b border-gray-200 mb-6">
              {[
                { label: `My Activities`, count: applyFilters(activities, 'date').length },
                { label: `My Tasks`, count: applyFilters(tasks, 'dueDate').length },
                { label: `My Projects`, count: 0 },
                { label: `My Deals`, count: applyFilters(deals, 'closeDate').length }
              ].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === index
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {tab.count}
                  </span>
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