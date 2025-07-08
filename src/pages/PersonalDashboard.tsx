import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Folder, CreditCard, Users, Check, Clock } from 'lucide-react';

interface PersonalDashboardProps {
  setCurrentView?: (view: string) => void;
}

export default function PersonalDashboard({ setCurrentView }: PersonalDashboardProps) {
  const [showQuickAddMenu, setShowQuickAddMenu] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('nl-NL', options));
  }, []);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuickAddMenu(!showQuickAddMenu);
  };

  const handleDocumentClick = () => {
    setShowQuickAddMenu(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const renderCalendar = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const todayDate = now.getDate();

    const monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust for Monday start
    const offset = (firstDay === 0) ? 6 : firstDay - 1;

    const calendarDays = [];
    
    // Empty cells for days before the first day of the month
    for(let i = 0; i < offset; i++) {
      calendarDays.push(<div key={`empty-${i}`}></div>);
    }

    // Days of the month
    for(let day = 1; day <= daysInMonth; day++) {
      const isToday = day === todayDate;
      calendarDays.push(
        <div
          key={day}
          className={`h-8 flex items-center justify-center rounded-full cursor-pointer ${
            isToday 
              ? 'bg-indigo-600 text-white font-bold' 
              : 'hover:bg-slate-100'
          }`}
        >
          {day}
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold">{monthNames[month]} {year}</h4>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500 font-semibold">
          <div>Ma</div>
          <div>Di</div>
          <div>Wo</div>
          <div>Do</div>
          <div>Vr</div>
          <div>Za</div>
          <div>Zo</div>
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2 text-center text-sm">
          {calendarDays}
        </div>
      </div>
    );
  };

  return (
    <div className="text-slate-800 bg-gray-50 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Goedemorgen, Serkan</h1>
            <p className="text-slate-500 mt-1">{currentDate}</p>
          </div>
          <div className="relative mt-4 sm:mt-0">
            <button 
              onClick={handleQuickAddClick}
              className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Aanmaken
            </button>
            {showQuickAddMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10">
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  Taak
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  Contactpersoon
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  Deal
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Navigation Modules */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => setCurrentView && setCurrentView('/projects')}
                  className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-indigo-50 border-indigo-200 text-left"
                >
                  <div className="bg-indigo-200 text-indigo-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Folder className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Project Management</h3>
                  <p className="text-sm text-indigo-800/70 mt-2">Open je projecten en taken</p>
                </button>
                
                <button 
                  onClick={() => setCurrentView && setCurrentView('/sales/list')}
                  className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-teal-50 border-teal-200 text-left"
                >
                  <div className="bg-teal-200 text-teal-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Sales Tool</h3>
                  <p className="text-sm text-teal-800/70 mt-2">Beheer je deals en pipeline</p>
                </button>
                
                <button 
                  onClick={() => setCurrentView && setCurrentView('/inbox')}
                  className="group bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-amber-50 border-amber-200 text-left"
                >
                  <div className="bg-amber-200 text-amber-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">CRM</h3>
                  <p className="text-sm text-amber-800/70 mt-2">Vind je contacten en bedrijven</p>
                </button>
              </div>
            </section>

            {/* My Day Widget */}
            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Mijn Dag</h3>
              <div className="space-y-4">
                {/* Task Item */}
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">Design system components update afronden</p>
                    <p className="text-sm text-slate-500">Project: Website Redesign</p>
                  </div>
                  <span className="text-sm font-semibold text-red-600">Vandaag</span>
                </div>
                
                {/* Calendar Item */}
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">Sync met Clif over Q3 planning</p>
                    <p className="text-sm text-slate-500">FlowQi GmbH</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-600">11:00</span>
                </div>
                
                {/* Task Item */}
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">Voorstel voor nieuwe klant uitwerken</p>
                    <p className="text-sm text-slate-500">Deal: Innovate Inc.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Calendar Widget */}
            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              {renderCalendar()}
            </section>

            {/* Recent Activity Widget */}
            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Recente Activiteit</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    C
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Clif</span> heeft de status van 'Design afronden' gewijzigd naar{' '}
                      <span className="font-semibold text-green-600">Voltooid</span>.
                    </p>
                    <p className="text-xs text-slate-400">15 minuten geleden</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    L
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Laura</span> heeft je genoemd in een opmerking bij de taak 'Nieuwe Ad Copy'.
                    </p>
                    <p className="text-xs text-slate-400">1 uur geleden</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
} 