import React, { useState, useEffect } from 'react';
import { Plus, X, Search, Calendar, Clock, Users } from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: string[];
  agenda: string;
  notes: string;
  actionItems: ActionItem[];
  incompleteTasks?: ActionItem[];
}

interface ActionItem {
  id: string;
  name: string;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'inprogress' | 'done';
}

interface ProjectTask {
  id: string;
  name: string;
}

export default function MeetingNotes() {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: 'Q3 Kick-off Meeting',
      date: '2025-08-04',
      time: '11:00',
      attendees: ['S', 'C', 'L'],
      agenda: '<ul><li>Recap</li><li>Mockups</li></ul>',
      notes: '<p>Agreed on Cosmic theme.</p>',
      actionItems: [
        { id: 'task-01', name: 'Finalize design mockups', assignee: 'Laura', dueDate: '2025-08-05', status: 'inprogress' },
        { id: 'task-02', name: 'Develop header component', assignee: 'Clif', dueDate: '2025-08-08', status: 'todo' }
      ],
      incompleteTasks: [
        { id: 'task-03', name: 'Review API documentation', assignee: 'Serkan', dueDate: '2025-08-01', status: 'todo' }
      ]
    },
    {
      id: 2,
      title: 'Design Review',
      date: '2025-07-28',
      time: '14:00',
      attendees: ['S', 'L'],
      agenda: '<ul><li>Wireframes</li></ul>',
      notes: '<p>Wireframes approved.</p>',
      actionItems: []
    }
  ]);

  const [existingProjectTasks] = useState<ProjectTask[]>([
    { id: 'task-05', name: 'Hire a new developer' },
    { id: 'task-06', name: 'Set up CI/CD pipeline' },
    { id: 'task-07', name: 'User Acceptance Testing plan' }
  ]);

  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [isNewMeeting, setIsNewMeeting] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [projectStatus, setProjectStatus] = useState('on-track');
  const [newMeetingData, setNewMeetingData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    agenda: '',
    notes: ''
  });
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const selectedMeeting = selectedMeetingId ? meetings.find(m => m.id === selectedMeetingId) : null;

  const createActionItemRow = (task: Partial<ActionItem> = {}, isRecap = false) => {
    const newItem: ActionItem = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: task.name || '',
      assignee: task.assignee || 'unassigned',
      dueDate: task.dueDate || '',
      status: task.status || 'todo'
    };
    return newItem;
  };

  const addActionItem = (task: Partial<ActionItem> = {}, isRecap = false) => {
    const newItem = createActionItemRow(task, isRecap);
    setActionItems(prev => [...prev, newItem]);
  };

  const updateActionItem = (id: string, updates: Partial<ActionItem>) => {
    setActionItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeActionItem = (id: string) => {
    setActionItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMeetingSelect = (meetingId: number) => {
    setSelectedMeetingId(meetingId);
    setIsNewMeeting(false);
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting) {
      setActionItems(meeting.actionItems || []);
    }
  };

  const handleNewMeeting = () => {
    setSelectedMeetingId(null);
    setIsNewMeeting(true);
    setActionItems([]);
    setNewMeetingData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      agenda: '',
      notes: ''
    });
  };

  const addExistingTasks = () => {
    selectedTasks.forEach(taskName => {
      addActionItem({ name: taskName });
    });
    setSelectedTasks([]);
    setShowTaskModal(false);
  };

  const addRecapItems = () => {
    const lastMeeting = meetings[0];
    if (lastMeeting && lastMeeting.incompleteTasks && lastMeeting.incompleteTasks.length > 0) {
      lastMeeting.incompleteTasks.forEach(task => {
        addActionItem(task, true);
      });
              alert('Outstanding action items loaded!');
    } else {
      alert("No outstanding action items found.");
    }
    setShowActionDropdown(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meetings: Website Redesign</h1>
            <p className="text-gray-500 mt-1">Manage all meetings and action items for this project here.</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button 
              className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm"
              onClick={() => {
                // Save meeting logic here
                console.log('Saving meeting...');
              }}
            >
              Save Meeting
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 space-y-10">
            {isNewMeeting ? (
              // New Meeting Form
              <>
                <section>
                  <input 
                    type="text" 
                    placeholder="Meeting title" 
                    value={newMeetingData.title}
                    onChange={(e) => setNewMeetingData(prev => ({ ...prev, title: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 w-full border-0 p-0 focus:ring-0 bg-transparent"
                  />
                  <div className="grid grid-cols-3 gap-8 border-b pb-6 mt-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-500">Date</label>
                      <input 
                        type="date" 
                        value={newMeetingData.date}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, date: e.target.value }))}
                        className="font-medium w-full border-0 p-0 focus:ring-0 mt-1 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-500">Time</label>
                      <input 
                        type="time" 
                        value={newMeetingData.time}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, time: e.target.value }))}
                        className="font-medium w-full border-0 p-0 focus:ring-0 mt-1 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-500">Attendees</label>
                      <div className="flex items-center -space-x-2 mt-1">
                        <button className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Agenda</h2>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <textarea
                      value={newMeetingData.agenda}
                      onChange={(e) => setNewMeetingData(prev => ({ ...prev, agenda: e.target.value }))}
                      placeholder="Enter agenda items..."
                      className="w-full min-h-[150px] border-0 bg-transparent resize-none focus:ring-0"
                    />
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-4">Notes</h2>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <textarea
                      value={newMeetingData.notes}
                      onChange={(e) => setNewMeetingData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Enter notes..."
                      className="w-full min-h-[150px] border-0 bg-transparent resize-none focus:ring-0"
                    />
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Action Items</h2>
                    <div className="relative">
                      <button 
                        onClick={() => setShowActionDropdown(!showActionDropdown)}
                        className="text-indigo-600 p-2 rounded-full hover:bg-indigo-50"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      {showActionDropdown && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-1 z-20 border">
                          <button 
                            onClick={() => {
                              addActionItem();
                              setShowActionDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Add new action item
                          </button>
                          <button 
                            onClick={() => {
                              setShowTaskModal(true);
                              setShowActionDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Add existing task
                          </button>
                          <button 
                            onClick={addRecapItems}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Add outstanding action items
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {actionItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg">
                        <input 
                          type="checkbox" 
                          checked={item.status === 'done'}
                          onChange={(e) => updateActionItem(item.id, { status: e.target.checked ? 'done' : 'todo' })}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
                        />
                        <input 
                          type="text" 
                          value={item.name}
                          onChange={(e) => updateActionItem(item.id, { name: e.target.value })}
                          placeholder="Enter a task..." 
                          className="flex-grow font-medium p-1 rounded-md focus:bg-gray-100 border-0 focus:ring-0"
                        />
                        <select 
                          value={item.assignee}
                          onChange={(e) => updateActionItem(item.id, { assignee: e.target.value })}
                          className="border-gray-300 rounded-md text-sm p-1"
                        >
                          <option value="unassigned">Assign to...</option>
                          <option value="Serkan">Serkan</option>
                          <option value="Clif">Clif</option>
                          <option value="Laura">Laura</option>
                        </select>
                        <input 
                          type="date" 
                          value={item.dueDate}
                          onChange={(e) => updateActionItem(item.id, { dueDate: e.target.value })}
                          className="border-gray-300 rounded-md text-sm p-1"
                        />
                        <select 
                          value={item.status}
                          onChange={(e) => updateActionItem(item.id, { status: e.target.value as 'todo' | 'inprogress' | 'done' })}
                          className="border-gray-300 rounded-md text-sm p-1"
                        >
                          <option value="todo">To Do</option>
                          <option value="inprogress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                        <button 
                          onClick={() => removeActionItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : selectedMeeting ? (
              // View Existing Meeting
              <>
                <section>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedMeeting.title}</h1>
                  <div className="grid grid-cols-3 gap-8 border-b pb-6 mt-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-500">Date</label>
                      <p className="font-medium">{formatDate(selectedMeeting.date)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-500">Time</label>
                      <p className="font-medium">{selectedMeeting.time}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-500">Attendees</label>
                      <div className="flex items-center -space-x-2 mt-1">
                        {selectedMeeting.attendees.map((attendee, index) => (
                          <div key={index} className="h-8 w-8 rounded-full bg-indigo-500 text-white text-sm font-medium flex items-center justify-center ring-2 ring-white">
                            {attendee}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold mb-4">Agenda</h2>
                  <div className="p-4 border rounded-lg bg-gray-50" dangerouslySetInnerHTML={{ __html: selectedMeeting.agenda }} />
                </section>
                
                <section>
                  <h2 className="text-xl font-bold mb-4">Notes</h2>
                  <div className="p-4 border rounded-lg bg-gray-50" dangerouslySetInnerHTML={{ __html: selectedMeeting.notes }} />
                </section>
                
                <section>
                  <h2 className="text-xl font-bold mb-4">Actiepunten</h2>
                  <div className="space-y-3">
                    {selectedMeeting.actionItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg bg-yellow-50">
                        <input 
                          type="checkbox" 
                          checked={item.status === 'done'}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
                          readOnly
                        />
                        <span className="flex-grow font-medium">{item.name}</span>
                        <span className="text-sm text-gray-600">{item.assignee}</span>
                        <span className="text-sm text-gray-600">{item.dueDate}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === 'done' ? 'bg-green-100 text-green-800' :
                          item.status === 'inprogress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status === 'done' ? 'Done' : item.status === 'inprogress' ? 'In Progress' : 'To Do'}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Project Status</h3>
              <p className="text-sm text-gray-500 mb-2">Set the project status.</p>
              <select 
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              >
                <option value="on-track" className="text-green-600">On Track</option>
                <option value="at-risk" className="text-yellow-600">At Risk</option>
                <option value="off-track" className="text-red-600">Off Track</option>
              </select>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex justify-between items-center mb-2 px-2">
                <h3 className="font-bold text-lg text-gray-900">Meeting History</h3>
                <button 
                  onClick={handleNewMeeting}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  + New Meeting
                </button>
              </div>
              <div className="space-y-1">
                {meetings.map((meeting) => (
                  <button
                    key={meeting.id}
                    onClick={() => handleMeetingSelect(meeting.id)}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                      selectedMeetingId === meeting.id ? 'bg-indigo-50 font-semibold text-indigo-600' : ''
                    }`}
                  >
                    <p className="font-medium">{meeting.title}</p>
                    <p className="text-xs text-gray-500">{formatDate(meeting.date)}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-bold">Add existing task to agenda</h3>
                <p className="text-sm text-gray-500">Search and select tasks to discuss.</p>
              </div>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="text-2xl leading-none text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <input 
                type="text" 
                placeholder="Search for tasks..." 
                className="w-full border-gray-300 rounded-md p-2 text-sm mb-4"
              />
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {existingProjectTasks.map((task) => (
                  <label key={task.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedTasks.includes(task.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTasks(prev => [...prev, task.name]);
                        } else {
                          setSelectedTasks(prev => prev.filter(name => name !== task.name));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-medium">{task.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end">
              <button 
                onClick={addExistingTasks}
                className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                Add to agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}