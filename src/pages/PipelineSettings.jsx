import React, { useState } from 'react';
import { 
  Settings,
  HelpCircle,
  Save,
  RotateCcw,
  AlertCircle,
  Clock,
  Mail,
  UserPlus,
  CheckSquare,
  Flame,
  Eye,
  EyeOff,
  Info,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Target,
  TrendingUp
} from 'lucide-react';

const PipelineSettings = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [selectedPipeline, setSelectedPipeline] = useState('main');
  const [dealProbabilityEnabled, setDealProbabilityEnabled] = useState(true);

  // Pipeline stages configuration - Horizontal Board Style
  const [pipelineStages, setPipelineStages] = useState([
    {
      id: 'lead',
      name: 'Lead',
      color: 'gray',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      headerBg: 'bg-gray-100',
      textColor: 'text-gray-700',
      probability: 20,
      rotting: {
        enabled: false,
        days: 7,
        action: 'create_task'
      }
    },
    {
      id: 'qualified',
      name: 'Qualified',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-100',
      textColor: 'text-blue-700',
      probability: 40,
      rotting: {
        enabled: true,
        days: 5,
        action: 'create_task'
      }
    },
    {
      id: 'proposal',
      name: 'Proposal',
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headerBg: 'bg-orange-100',
      textColor: 'text-orange-700',
      probability: 65,
      rotting: {
        enabled: true,
        days: 3,
        action: 'send_email'
      }
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      headerBg: 'bg-purple-100',
      textColor: 'text-purple-700',
      probability: 80,
      rotting: {
        enabled: true,
        days: 2,
        action: 'assign_manager'
      }
    },
    {
      id: 'won',
      name: 'Won',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headerBg: 'bg-green-100',
      textColor: 'text-green-700',
      probability: 100,
      rotting: {
        enabled: false,
        days: 0,
        action: 'none'
      }
    },
    {
      id: 'lost',
      name: 'Lost',
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      headerBg: 'bg-red-100',
      textColor: 'text-red-700',
      probability: 0,
      rotting: {
        enabled: false,
        days: 0,
        action: 'none'
      }
    }
  ]);

  // Available pipelines (for multi-pipeline support)
  const availablePipelines = [
    { id: 'main', label: 'Nederland Sales', icon: '🇳🇱' },
    { id: 'dach', label: 'DACH Region', icon: '🇩🇪' },
    { id: 'global', label: 'Global Pipeline', icon: '🌍' }
  ];

  // Action options for rotting
  const rottingActions = [
    { value: 'create_task', label: 'Maak taak aan', icon: '❗' },
    { value: 'send_email', label: 'Stuur herinnering', icon: '📩' },
    { value: 'assign_manager', label: 'Wijs toe aan Manager', icon: '👤' },
    { value: 'none', label: 'Geen actie', icon: '➖' }
  ];

  // Update functions
  const updateStage = (stageId, field, value) => {
    setPipelineStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { ...stage, [field]: value }
        : stage
    ));
    setHasChanges(true);
  };

  const updateRotting = (stageId, field, value) => {
    setPipelineStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { ...stage, rotting: { ...stage.rotting, [field]: value } }
        : stage
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving pipeline configuration:', pipelineStages);
    setHasChanges(false);
    // Success feedback
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
    notification.innerHTML = '✅ Pipeline configuratie opgeslagen!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Weet je zeker dat je alle wijzigingen wilt ongedaan maken?')) {
      setHasChanges(false);
    }
  };

  const addNewStage = () => {
    const newStage = {
      id: `stage_${Date.now()}`,
      name: 'New Stage',
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      headerBg: 'bg-indigo-100',
      textColor: 'text-indigo-700',
      probability: 50,
      rotting: {
        enabled: false,
        days: 5,
        action: 'create_task'
      }
    };
    setPipelineStages(prev => [...prev, newStage]);
    setHasChanges(true);
  };

  const Tooltip = ({ content, children }) => (
    <div className="relative inline-block group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Pipeline Settings
                </h1>
                <p className="text-gray-600 text-sm">Configure stages, win rates & rotting logic</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {hasChanges && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-800 font-medium">Niet opgeslagen ⚠️</span>
                </div>
              )}
              
              {hasChanges && (
                <button 
                  onClick={handleReset}
                  className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              )}
              
              <button 
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                  hasChanges 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Pipeline Selector & Global Settings */}
        <div className="mb-8 space-y-6">
          {/* Pipeline Selector */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Pipeline</h3>
              <button 
                onClick={addNewStage}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Stage
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <select 
                  value={selectedPipeline}
                  onChange={(e) => setSelectedPipeline(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none appearance-none pr-8 font-medium"
                >
                  {availablePipelines.map((pipeline) => (
                    <option key={pipeline.id} value={pipeline.id}>
                      {pipeline.icon} {pipeline.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 -ml-8 pointer-events-none" />
              </div>
              
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dealProbabilityEnabled}
                    onChange={(e) => setDealProbabilityEnabled(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Deal Probability inschakelen</span>
                </label>
                <Tooltip content="Beïnvloedt forecast berekeningen en deal weergave">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Board Layout - Stage Columns */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stage Configuration</h3>
            <p className="text-gray-600 text-sm">Configure each pipeline stage horizontally (swipe on mobile)</p>
          </div>
          
          {/* Horizontal Scrollable Container */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {pipelineStages.map((stage, index) => (
                <div 
                  key={stage.id} 
                  className={`${stage.bgColor} ${stage.borderColor} border-2 rounded-2xl p-6 min-w-[320px] max-w-[320px] shadow-sm hover:shadow-md transition-shadow`}
                >
                  {/* Stage Header */}
                  <div className={`${stage.headerBg} ${stage.textColor} rounded-xl px-4 py-3 mb-6 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${stage.color}-500`}></div>
                      <h4 className="font-bold text-base">{stage.name}</h4>
                      <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded-full">#{index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {dealProbabilityEnabled && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold text-sm">{stage.probability}%</span>
                        </div>
                      )}
                      {stage.rotting.enabled && stage.id !== 'won' && stage.id !== 'lost' && (
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-red-500" />
                          <span className="text-xs">{stage.rotting.days}d</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Configuration Fields */}
                  <div className="space-y-5">
                    
                    {/* Stage Name */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-semibold text-gray-700">Stage Name</label>
                        <Tooltip content="Aangepaste naam voor deze pipeline stage">
                          <Info className="w-3 h-3 text-gray-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="text"
                        value={stage.name}
                        onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium text-sm shadow-sm transition-colors"
                        placeholder="Stage naam..."
                      />
                    </div>

                    {/* Win Rate */}
                    {dealProbabilityEnabled && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="block text-sm font-semibold text-gray-700">Win Rate (%)</label>
                          <Tooltip content="Verwachte win-kans voor deals in deze stage">
                            <Info className="w-3 h-3 text-gray-400 cursor-help" />
                          </Tooltip>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={stage.probability}
                            onChange={(e) => updateStage(stage.id, 'probability', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-bold text-sm shadow-sm transition-colors"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <span className="text-gray-400 text-sm font-medium">%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rotting Days */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-semibold text-gray-700">Rotting (dagen)</label>
                        <Tooltip content="Na hoeveel dagen zonder update wordt een deal als 'rottend' gemarkeerd">
                          <Info className="w-3 h-3 text-gray-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={stage.rotting.days}
                        onChange={(e) => updateRotting(stage.id, 'days', parseInt(e.target.value) || 1)}
                        disabled={!stage.rotting.enabled || stage.id === 'won' || stage.id === 'lost'}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-medium text-sm shadow-sm transition-colors ${
                          !stage.rotting.enabled || stage.id === 'won' || stage.id === 'lost' 
                            ? 'bg-gray-50 text-gray-400' 
                            : ''
                        }`}
                      />
                    </div>

                    {/* Rotting Toggle */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-semibold text-gray-700">Rot-indicator</label>
                        <Tooltip content="Activeer waarschuwingen voor deals die te lang in deze stage blijven">
                          <Info className="w-3 h-3 text-gray-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateRotting(stage.id, 'enabled', !stage.rotting.enabled)}
                          disabled={stage.id === 'won' || stage.id === 'lost'}
                          className={`relative inline-flex h-10 w-18 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-sm ${
                            stage.rotting.enabled && stage.id !== 'won' && stage.id !== 'lost'
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                              : 'bg-gray-200'
                          } ${
                            stage.id === 'won' || stage.id === 'lost' 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'cursor-pointer'
                          }`}
                        >
                          <span
                            className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform shadow-sm ${
                              stage.rotting.enabled && stage.id !== 'won' && stage.id !== 'lost'
                                ? 'translate-x-10' 
                                : 'translate-x-1'
                            }`}
                          >
                            {stage.rotting.enabled && stage.id !== 'won' && stage.id !== 'lost' && (
                              <Flame className="w-4 h-4 text-red-500 mt-2 ml-2" />
                            )}
                          </span>
                        </button>
                        <span className={`text-sm font-semibold ${
                          stage.rotting.enabled && stage.id !== 'won' && stage.id !== 'lost'
                            ? 'text-purple-600' 
                            : 'text-gray-400'
                        }`}>
                          {stage.rotting.enabled && stage.id !== 'won' && stage.id !== 'lost' ? 'Actief 🔥' : 'Uit'}
                        </span>
                      </div>
                    </div>

                    {/* Action Dropdown */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-semibold text-gray-700">Actie bij rotting</label>
                        <Tooltip content="Automatische actie die wordt uitgevoerd wanneer een deal 'rot' wordt">
                          <Info className="w-3 h-3 text-gray-400 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="relative">
                        <select
                          value={stage.rotting.action}
                          onChange={(e) => updateRotting(stage.id, 'action', e.target.value)}
                          disabled={!stage.rotting.enabled || stage.id === 'won' || stage.id === 'lost'}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none appearance-none text-sm font-medium shadow-sm transition-colors pr-10 ${
                            !stage.rotting.enabled || stage.id === 'won' || stage.id === 'lost'
                              ? 'bg-gray-50 text-gray-400' 
                              : ''
                          }`}
                        >
                          {rottingActions.map((action) => (
                            <option key={action.value} value={action.value}>
                              {action.icon} {action.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                  </div>

                  {/* Active Rotting Info */}
                  {stage.rotting.enabled && stage.id !== 'won' && stage.id !== 'lost' && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-amber-800 mb-1">Rotting Actief</p>
                          <p className="text-amber-700 text-xs">
                            Na <span className="font-bold">{stage.rotting.days} dagen</span> zonder update: 
                            <span className="font-semibold ml-1">
                              {rottingActions.find(a => a.value === stage.rotting.action)?.label}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Scroll Hint */}
          <div className="md:hidden mt-4 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              👆 Swipe horizontaal om alle stages te zien
            </p>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 via-white to-blue-50 border border-purple-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Pipeline Overzicht
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pipelineStages.map((stage) => (
              <div key={stage.id} className="text-center">
                <div className={`${stage.headerBg} ${stage.textColor} rounded-xl p-4 mb-3 border ${stage.borderColor}`}>
                  <div className="font-bold text-xl">{stage.probability}%</div>
                  <div className="text-xs opacity-75 mt-1">Win Rate</div>
                </div>
                <div className="text-sm font-semibold text-gray-700">{stage.name}</div>
                {stage.rotting.enabled && (
                  <div className="text-xs text-amber-600 mt-2 flex items-center justify-center gap-1">
                    <Flame className="w-3 h-3" />
                    {stage.rotting.days}d rot
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineSettings; 