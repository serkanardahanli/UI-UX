import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

type TabType = 'logo' | 'address' | 'social' | 'contact' | 'note';

export default function CreateOrganization() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('logo');
  const [subForm, setSubForm] = useState<'newContact' | 'existingContact' | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    companyName: '',
    orgType: 'Customer',
    companyAddress: '',
    website: '',
    linkedin: '',
    phone: '',
    email: '',
    note: '',
    newContactName: '',
    newContactEmail: '',
    existingContact: ''
  });

  // File upload state
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const openModal = () => {
    setShowModal(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('overflow-hidden');
  };

  const switchTab = (tabName: TabType) => {
    setActiveTab(tabName);
  };

  const toggleSubForm = (formType: 'newContact' | 'existingContact') => {
    setSubForm(subForm === formType ? null : formType);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    console.log('Files dropped:', files);
    // Handle file upload logic here
  };

  const handleSave = () => {
    console.log('Saving company data:', formData);
    closeModal();
  };



  return (
    <div className="min-h-screen bg-slate-100">
      {/* Main Page Content */}
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={openModal}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Add Company
        </button>
      </div>

      {/* Add Company Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 transform transition-transform duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">Add company</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="orgType" className="block text-sm font-medium text-slate-700 mb-1">
                  Organization Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="orgType"
                  value={formData.orgType}
                  onChange={(e) => handleInputChange('orgType', e.target.value)}
                  className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Customer</option>
                  <option>Supplier</option>
                  <option>Lead</option>
                  <option>Partner</option>
                </select>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  <button
                    onClick={() => switchTab('logo')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'logo'
                        ? 'text-indigo-600 border-indigo-600'
                        : 'text-slate-500 border-transparent hover:text-indigo-600'
                    }`}
                  >
                    Logo
                  </button>
                  <button
                    onClick={() => switchTab('address')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'address'
                        ? 'text-indigo-600 border-indigo-600'
                        : 'text-slate-500 border-transparent hover:text-indigo-600'
                    }`}
                  >
                    Address
                  </button>
                  <button
                    onClick={() => switchTab('social')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'social'
                        ? 'text-indigo-600 border-indigo-600'
                        : 'text-slate-500 border-transparent hover:text-indigo-600'
                    }`}
                  >
                    Social
                  </button>
                  <button
                    onClick={() => switchTab('contact')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'contact'
                        ? 'text-indigo-600 border-indigo-600'
                        : 'text-slate-500 border-transparent hover:text-indigo-600'
                    }`}
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => switchTab('note')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'note'
                        ? 'text-indigo-600 border-indigo-600'
                        : 'text-slate-500 border-transparent hover:text-indigo-600'
                    }`}
                  >
                    Note
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="pt-2">
                {/* Logo Tab */}
                {activeTab === 'logo' && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center w-full h-32 px-4 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
                      dragOver
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <Upload className="w-8 h-8 mb-3 text-slate-400" />
                    <p className="text-sm text-slate-500">
                      <span className="font-semibold">Drag and drop your file here.</span>{' '}
                      <span className="text-indigo-600">Browse files</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">JPEG, JPG, PNG, GIF, or PDF</p>
                    <input type="file" className="hidden" />
                  </div>
                )}

                {/* Address Tab */}
                {activeTab === 'address' && (
                  <div>
                    <label htmlFor="companyAddress" className="block text-sm font-medium text-slate-700 mb-1">
                      Company Address
                    </label>
                    <input
                      type="text"
                      id="companyAddress"
                      value={formData.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search address..."
                    />
                  </div>
                )}

                {/* Social Tab */}
                {activeTab === 'social' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleSubForm('newContact')}
                        className="w-full text-sm font-medium p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700"
                      >
                        New Contact
                      </button>
                      <button
                        onClick={() => toggleSubForm('existingContact')}
                        className="w-full text-sm font-medium p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700"
                      >
                        Existing Contact
                      </button>
                    </div>
                    
                    <div className={`mt-4 transition-all duration-400 overflow-hidden ${subForm ? 'max-h-96' : 'max-h-0'}`}>
                      {subForm === 'newContact' && (
                        <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-4">
                          <label className="block text-sm font-medium text-slate-700">Create New Contact</label>
                          <input
                            type="text"
                            value={formData.newContactName}
                            onChange={(e) => handleInputChange('newContactName', e.target.value)}
                            placeholder="Contact Name"
                            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <input
                            type="email"
                            value={formData.newContactEmail}
                            onChange={(e) => handleInputChange('newContactEmail', e.target.value)}
                            placeholder="Contact Email"
                            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      )}
                      {subForm === 'existingContact' && (
                        <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                          <label htmlFor="selectExistingContact" className="block text-sm font-medium text-slate-700">
                            Select Existing Contact
                          </label>
                          <select
                            id="selectExistingContact"
                            value={formData.existingContact}
                            onChange={(e) => handleInputChange('existingContact', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          >
                            <option>Search or select a contact...</option>
                            <option>Benjamin Leon</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Note Tab */}
                {activeTab === 'note' && (
                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-slate-700 mb-1">
                      Note
                    </label>
                    <textarea
                      id="note"
                      rows={4}
                      value={formData.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-5 border-t border-slate-200 bg-slate-50 rounded-b-lg">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border rounded-md shadow-sm hover:bg-indigo-700"
              >
                Add company
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}