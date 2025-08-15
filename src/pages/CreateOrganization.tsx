import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Minus } from 'lucide-react';

interface Label {
  id: string;
  text: string;
}

interface DynamicField {
  id: string;
  value: string;
}

export default function CreateOrganization() {
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [orgMoreInfo, setOrgMoreInfo] = useState(false);
  const [contactMoreInfo, setContactMoreInfo] = useState(false);
  const [orgSubForm, setOrgSubForm] = useState<'newContact' | 'existingContact' | null>(null);
  const [contactSubForm, setContactSubForm] = useState<'newOrg' | 'existingOrg' | null>(null);

  // Labels state
  const [orgLabels, setOrgLabels] = useState<Label[]>([]);
  const [contactLabels, setContactLabels] = useState<Label[]>([]);
  const [orgLabelInput, setOrgLabelInput] = useState('');
  const [contactLabelInput, setContactLabelInput] = useState('');

  // Dynamic fields
  const [orgEmails, setOrgEmails] = useState<DynamicField[]>([{ id: '1', value: '' }]);
  const [orgPhones, setOrgPhones] = useState<DynamicField[]>([{ id: '1', value: '' }]);
  const [contactEmails, setContactEmails] = useState<DynamicField[]>([{ id: '1', value: '' }]);
  const [contactPhones, setContactPhones] = useState<DynamicField[]>([{ id: '1', value: '' }]);

  // Form data
  const [orgData, setOrgData] = useState({
    name: '',
    address: '',
    website: '',
    linkedin: '',
    type: 'Customer',
    owner: 'Sevgi Ardahanli (You)'
  });

  const [contactData, setContactData] = useState({
    name: '',
    type: 'Prospect',
    owner: 'Sevgi Ardahanli (You)'
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowOrgModal(false);
        setShowContactModal(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const openModal = (type: 'org' | 'contact') => {
    if (type === 'org') {
      setShowOrgModal(true);
    } else {
      setShowContactModal(true);
    }
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = (type: 'org' | 'contact') => {
    if (type === 'org') {
      setShowOrgModal(false);
    } else {
      setShowContactModal(false);
    }
    document.body.classList.remove('overflow-hidden');
  };

  const addLabel = (type: 'org' | 'contact') => {
    const input = type === 'org' ? orgLabelInput : contactLabelInput;
    const labels = type === 'org' ? orgLabels : contactLabels;
    
    if (input.trim() && !labels.find(label => label.text === input.trim())) {
      const newLabel = { id: Date.now().toString(), text: input.trim() };
      if (type === 'org') {
        setOrgLabels([...orgLabels, newLabel]);
        setOrgLabelInput('');
      } else {
        setContactLabels([...contactLabels, newLabel]);
        setContactLabelInput('');
      }
    }
  };

  const removeLabel = (type: 'org' | 'contact', labelId: string) => {
    if (type === 'org') {
      setOrgLabels(orgLabels.filter(label => label.id !== labelId));
    } else {
      setContactLabels(contactLabels.filter(label => label.id !== labelId));
    }
  };

  const addDynamicField = (type: 'orgEmails' | 'orgPhones' | 'contactEmails' | 'contactPhones') => {
    const newField = { id: Date.now().toString(), value: '' };
    
    switch (type) {
      case 'orgEmails':
        setOrgEmails([...orgEmails, newField]);
        break;
      case 'orgPhones':
        setOrgPhones([...orgPhones, newField]);
        break;
      case 'contactEmails':
        setContactEmails([...contactEmails, newField]);
        break;
      case 'contactPhones':
        setContactPhones([...contactPhones, newField]);
        break;
    }
  };

  const removeDynamicField = (type: 'orgEmails' | 'orgPhones' | 'contactEmails' | 'contactPhones', fieldId: string) => {
    switch (type) {
      case 'orgEmails':
        setOrgEmails(orgEmails.filter(field => field.id !== fieldId));
        break;
      case 'orgPhones':
        setOrgPhones(orgPhones.filter(field => field.id !== fieldId));
        break;
      case 'contactEmails':
        setContactEmails(contactEmails.filter(field => field.id !== fieldId));
        break;
      case 'contactPhones':
        setContactPhones(contactPhones.filter(field => field.id !== fieldId));
        break;
    }
  };

  const updateDynamicField = (type: 'orgEmails' | 'orgPhones' | 'contactEmails' | 'contactPhones', fieldId: string, value: string) => {
    switch (type) {
      case 'orgEmails':
        setOrgEmails(orgEmails.map(field => field.id === fieldId ? { ...field, value } : field));
        break;
      case 'orgPhones':
        setOrgPhones(orgPhones.map(field => field.id === fieldId ? { ...field, value } : field));
        break;
      case 'contactEmails':
        setContactEmails(contactEmails.map(field => field.id === fieldId ? { ...field, value } : field));
        break;
      case 'contactPhones':
        setContactPhones(contactPhones.map(field => field.id === fieldId ? { ...field, value } : field));
        break;
    }
  };

  const toggleSubForm = (type: 'org' | 'contact', formType: string) => {
    if (type === 'org') {
      setOrgSubForm(orgSubForm === formType ? null : formType as 'newContact' | 'existingContact');
    } else {
      setContactSubForm(contactSubForm === formType ? null : formType as 'newOrg' | 'existingOrg');
    }
  };

  const handleSave = (type: 'org' | 'contact') => {
    // Here you would typically handle the form submission
    console.log(`Saving ${type} data:`, type === 'org' ? orgData : contactData);
    closeModal(type);
  };

  const DynamicFieldsComponent = ({ 
    fields, 
    type, 
    placeholder, 
    fieldType, 
    colorScheme 
  }: {
    fields: DynamicField[];
    type: 'orgEmails' | 'orgPhones' | 'contactEmails' | 'contactPhones';
    placeholder: string;
    fieldType: 'email' | 'tel';
    colorScheme: string;
  }) => (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <input
            type={fieldType}
            value={field.value}
            onChange={(e) => updateDynamicField(type, field.id, e.target.value)}
            className={`block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-${colorScheme}-500 focus:border-${colorScheme}-500 sm:text-sm`}
            placeholder={placeholder}
          />
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => removeDynamicField(type, field.id)}
              className="text-slate-400 hover:text-red-500"
            >
              <Minus className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addDynamicField(type)}
        className={`text-sm font-semibold text-${colorScheme}-600 hover:text-${colorScheme}-800`}
      >
        + Add another
      </button>
    </div>
  );

  const LabelsComponent = ({ 
    labels, 
    input, 
    setInput, 
    onAdd, 
    onRemove, 
    colorScheme, 
    placeholder 
  }: {
    labels: Label[];
    input: string;
    setInput: (value: string) => void;
    onAdd: () => void;
    onRemove: (id: string) => void;
    colorScheme: string;
    placeholder: string;
  }) => (
    <div className={`flex flex-wrap items-center gap-2 p-1 border border-slate-300 rounded-md focus-within:ring-1 focus-within:ring-${colorScheme}-500 focus-within:border-${colorScheme}-500`}>
      <div className="flex flex-wrap gap-1">
        {labels.map(label => (
          <span
            key={label.id}
            className={`flex items-center gap-1 bg-${colorScheme}-100 text-${colorScheme}-700 text-xs font-semibold px-2.5 py-1 rounded-full`}
          >
            {label.text}
            <button
              type="button"
              onClick={() => onRemove(label.id)}
              className={`text-${colorScheme}-400 hover:text-${colorScheme}-600`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAdd();
          }
        }}
        className="flex-grow border-none focus:ring-0 p-1 text-sm"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Main Page Content */}
      <div className="flex items-center justify-center h-screen space-x-4">
        <button
          onClick={() => openModal('org')}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Add Organization
        </button>
        <button
          onClick={() => openModal('contact')}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          Add Contact
        </button>
      </div>

      {/* Add Organization Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 transform transition-transform duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">Add Organization</h3>
              <button onClick={() => closeModal('org')} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Organization Name</label>
                  <input
                    type="text"
                    value={orgData.name}
                    onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="FlowQi Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Address</label>
                  <input
                    type="text"
                    value={orgData.address}
                    onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="123 FlowQi Street, New York"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <DynamicFieldsComponent
                    fields={orgEmails}
                    type="orgEmails"
                    placeholder="contact@flowqi.com"
                    fieldType="email"
                    colorScheme="indigo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Phone</label>
                  <DynamicFieldsComponent
                    fields={orgPhones}
                    type="orgPhones"
                    placeholder="555-123-4567"
                    fieldType="tel"
                    colorScheme="indigo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Organization Type <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <select
                    value={orgData.type}
                    onChange={(e) => setOrgData({ ...orgData, type: e.target.value })}
                    className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>Customer</option>
                    <option>Supplier</option>
                    <option>Lead</option>
                    <option>Partner</option>
                    <option>Archived</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOrgMoreInfo(!orgMoreInfo)}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                More details...
              </button>

              {orgMoreInfo && (
                <div className="space-y-6 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Website</label>
                      <input
                        type="text"
                        value={orgData.website}
                        onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="www.flowqi.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">LinkedIn</label>
                      <input
                        type="text"
                        value={orgData.linkedin}
                        onChange={(e) => setOrgData({ ...orgData, linkedin: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="linkedin.com/company/flowqi"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Owner</label>
                      <div className="relative mt-1">
                        <select
                          value={orgData.owner}
                          onChange={(e) => setOrgData({ ...orgData, owner: e.target.value })}
                          className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option>Sevgi Ardahanli (You)</option>
                          <option>John Doe</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Labels</label>
                      <div className="relative mt-1">
                        <LabelsComponent
                          labels={orgLabels}
                          input={orgLabelInput}
                          setInput={setOrgLabelInput}
                          onAdd={() => addLabel('org')}
                          onRemove={(id) => removeLabel('org', id)}
                          colorScheme="indigo"
                          placeholder="Add label..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-slate-200 pt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Contact Person (optional)</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleSubForm('org', 'newContact')}
                    className={`w-full text-sm font-medium p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700 ${
                      orgSubForm === 'newContact' ? 'bg-slate-100' : ''
                    }`}
                  >
                    New Contact
                  </button>
                  <button
                    onClick={() => toggleSubForm('org', 'existingContact')}
                    className={`w-full text-sm font-medium p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700 ${
                      orgSubForm === 'existingContact' ? 'bg-slate-100' : ''
                    }`}
                  >
                    Existing Contact
                  </button>
                </div>

                {orgSubForm && (
                  <div className="mt-4 transition-all duration-300">
                    {orgSubForm === 'newContact' && (
                      <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700">Name</label>
                          <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="New Contact"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input
                              type="email"
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Phone</label>
                            <input
                              type="tel"
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700">
                            Contact Type <span className="text-red-500">*</span>
                          </label>
                          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Prospect</option>
                            <option>Member</option>
                          </select>
                        </div>
                      </div>
                    )}
                    {orgSubForm === 'existingContact' && (
                      <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                        <label className="block text-sm font-medium text-slate-700">Select contact</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                          <option>Search or select a contact...</option>
                          <option>Benjamin Leon</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-5 border-t border-slate-200 bg-slate-50 rounded-b-lg">
              <button
                onClick={() => closeModal('org')}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave('org')}
                className="ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border rounded-md shadow-sm hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 transform transition-transform duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">Add Contact Person</h3>
              <button onClick={() => closeModal('contact')} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Jane Smith"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <DynamicFieldsComponent
                    fields={contactEmails}
                    type="contactEmails"
                    placeholder="jane@example.com"
                    fieldType="email"
                    colorScheme="green"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Phone</label>
                  <DynamicFieldsComponent
                    fields={contactPhones}
                    type="contactPhones"
                    placeholder="555-987-6543"
                    fieldType="tel"
                    colorScheme="green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Contact Type <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <select
                    value={contactData.type}
                    onChange={(e) => setContactData({ ...contactData, type: e.target.value })}
                    className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  >
                    <option>Prospect</option>
                    <option>Member</option>
                    <option>Supplier</option>
                    <option>Employee</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setContactMoreInfo(!contactMoreInfo)}
                className="text-sm font-semibold text-green-600 hover:text-green-800"
              >
                More details...
              </button>

              {contactMoreInfo && (
                <div className="space-y-6 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Owner</label>
                      <div className="relative mt-1">
                        <select
                          value={contactData.owner}
                          onChange={(e) => setContactData({ ...contactData, owner: e.target.value })}
                          className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                          <option>Sevgi Ardahanli (You)</option>
                          <option>John Doe</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Labels</label>
                      <div className="relative mt-1">
                        <LabelsComponent
                          labels={contactLabels}
                          input={contactLabelInput}
                          setInput={setContactLabelInput}
                          onAdd={() => addLabel('contact')}
                          onRemove={(id) => removeLabel('contact', id)}
                          colorScheme="green"
                          placeholder="Add label..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-slate-200 pt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Organization (optional)</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleSubForm('contact', 'newOrg')}
                    className={`w-full text-sm font-medium p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700 ${
                      contactSubForm === 'newOrg' ? 'bg-slate-100' : ''
                    }`}
                  >
                    New Organization
                  </button>
                  <button
                    onClick={() => toggleSubForm('contact', 'existingOrg')}
                    className={`w-full text-sm font-medium p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700 ${
                      contactSubForm === 'existingOrg' ? 'bg-slate-100' : ''
                    }`}
                  >
                    Existing Organization
                  </button>
                </div>

                {contactSubForm && (
                  <div className="mt-4 transition-all duration-300">
                    {contactSubForm === 'newOrg' && (
                      <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Organization Name</label>
                            <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                              placeholder="New Corp"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Address</label>
                            <input
                              type="text"
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input
                              type="email"
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Phone</label>
                            <input
                              type="tel"
                              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700">
                            Organization Type <span className="text-red-500">*</span>
                          </label>
                          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                            <option>Customer</option>
                            <option>Supplier</option>
                          </select>
                        </div>
                      </div>
                    )}
                    {contactSubForm === 'existingOrg' && (
                      <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                        <label className="block text-sm font-medium text-slate-700">Select organization</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                          <option>Search or select an organization...</option>
                          <option>EmpowerMove</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-5 border-t border-slate-200 bg-slate-50 rounded-b-lg">
              <button
                onClick={() => closeModal('contact')}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave('contact')}
                className="ml-3 px-4 py-2 text-sm font-medium text-white bg-green-600 border rounded-md shadow-sm hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}