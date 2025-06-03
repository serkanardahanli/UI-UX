import React, { useState } from 'react';

const ModuleManagementListView = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Sample data
  const availableModules = [
    { id: 'sales', name: 'Sales Tool', price: 16.99, icon: '💼' },
    { id: 'support', name: 'Support Tool', price: 26.99, icon: '🎧' },
    { id: 'marketing', name: 'Marketing Tool', price: 18.99, icon: '📈' },
    { id: 'invoicing', name: 'Invoicing Tool', price: 21.99, icon: '💳' },
    { id: 'product', name: 'Product Tool', price: 18.99, icon: '📦' },
    { id: 'docs', name: 'FlowQi Docs', price: 39.50, icon: '📄', type: 'organization' },
    { id: 'forms', name: 'FlowQi Forms', price: 29.50, icon: '📝', type: 'organization' }
  ];

  const users = [
    { id: 1, name: 'Serkan Ardahanli', username: 'serkan', email: 'serkan@flowqi.com', avatar: 'SA', status: 'active', role: 'Admin', team: 'Team 1, Team 2' },
    { id: 2, name: 'Pieter van der Meer', username: 'pieter', email: 'pieter@flowqi.com', avatar: 'PV', status: 'active', role: 'Owner', team: 'Team 1' },
    { id: 3, name: 'Joost Dansen', username: 'joost', email: 'joost@flowqi.com', avatar: 'JD', status: 'inactive', role: 'User', team: 'Team 2' },
    { id: 4, name: 'Mert Kahyaoğlu', username: 'mert', email: 'mert@flowqi.com', avatar: 'MK', status: 'active', role: 'User', team: 'Team 1, Team 2' },
    { id: 5, name: 'Alex Johnson', username: 'alex', email: 'alex@flowqi.com', avatar: 'AJ', status: 'active', role: 'User', team: 'Team 2' }
  ];

  // CRM module users for manage example
  const crmUsers = [1, 2, 4]; // User IDs who have CRM access

  const closeModal = () => {
    setActiveModal(null);
    setSelectedModule(null);
    setSelectedUsers([]);
  };

  const selectModule = (module) => {
    setSelectedModule(module);
    setSelectedUsers([]);
  };

  const toggleUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const calculateCost = () => {
    if (!selectedModule) return 0;
    if (selectedModule.type === 'organization') {
      return selectedModule.price;
    }
    return selectedModule.price * selectedUsers.length;
  };

  // Add More Products Modal - Card View
  const AddMoreProductsCardModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add More Products</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-body">
          {!selectedModule ? (
            <>
              <p className="modal-description">
                Select a module to add to your FlowQi workspace:
              </p>
              
              <div className="modules-list">
                {availableModules.map(module => (
                  <div 
                    key={module.id} 
                    className="module-item"
                    onClick={() => selectModule(module)}
                  >
                    <div className="module-icon">{module.icon}</div>
                    <div className="module-info">
                      <div className="module-name">{module.name}</div>
                      <div className="module-price">
                        €{module.price}{module.type === 'organization' ? '/org' : '/user'}/month
                      </div>
                    </div>
                    <div className="module-arrow">→</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="selected-module">
                <div className="module-icon large">{selectedModule.icon}</div>
                <div>
                  <h3>{selectedModule.name}</h3>
                  <p>€{selectedModule.price}{selectedModule.type === 'organization' ? '/org' : '/user'}/month</p>
                </div>
              </div>

              {selectedModule.type === 'organization' ? (
                <div className="org-module-info">
                  <p>This module will be available for all users in your organization.</p>
                </div>
              ) : (
                <>
                  <p className="section-title">Select users for this module:</p>
                  
                  <div className="users-grid">
                    {users.filter(user => user.status === 'active').map(user => (
                      <div 
                        key={user.id} 
                        className={`user-card ${selectedUsers.includes(user.id) ? 'selected' : ''}`}
                        onClick={() => toggleUser(user.id)}
                      >
                        <div className="user-avatar">{user.avatar}</div>
                        <div className="user-name">{user.name}</div>
                        {selectedUsers.includes(user.id) && (
                          <div className="selected-check">✓</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedUsers.length > 0 && (
                    <div className="cost-preview">
                      <span>Total cost: </span>
                      <span className="cost-amount">€{calculateCost().toFixed(2)}/month</span>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
        
        <div className="modal-footer">
          {selectedModule ? (
            <>
              <button className="btn btn-outline" onClick={() => setSelectedModule(null)}>
                Back
              </button>
              <button 
                className="btn btn-primary"
                disabled={selectedModule.type !== 'organization' && selectedUsers.length === 0}
              >
                Add Module
              </button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={closeModal}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Add More Products Modal - List View
  const AddMoreProductsListModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add More Products</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-body">
          {!selectedModule ? (
            <>
              <p className="modal-description">
                Select a module to add to your FlowQi workspace:
              </p>
              
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Module</th>
                      <th>Price</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableModules.map(module => (
                      <tr key={module.id} className="table-row">
                        <td>
                          <div className="module-icon small">{module.icon}</div>
                        </td>
                        <td>
                          <div className="module-name">{module.name}</div>
                        </td>
                        <td>
                          <div className="module-price">
                            €{module.price}{module.type === 'organization' ? '/org' : '/user'}/month
                          </div>
                        </td>
                        <td>
                          <span className={`type-badge ${module.type === 'organization' ? 'org' : 'user'}`}>
                            {module.type === 'organization' ? 'Organization' : 'Per User'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => selectModule(module)}
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="selected-module">
                <div className="module-icon large">{selectedModule.icon}</div>
                <div>
                  <h3>{selectedModule.name}</h3>
                  <p>€{selectedModule.price}{selectedModule.type === 'organization' ? '/org' : '/user'}/month</p>
                </div>
              </div>

              {selectedModule.type === 'organization' ? (
                <div className="org-module-info">
                  <p>This module will be available for all users in your organization.</p>
                </div>
              ) : (
                <>
                  <p className="section-title">Select users for this module:</p>
                  
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>
                            <input 
                              type="checkbox" 
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers(users.filter(u => u.status === 'active').map(u => u.id));
                                } else {
                                  setSelectedUsers([]);
                                }
                              }}
                              checked={selectedUsers.length === users.filter(u => u.status === 'active').length}
                            />
                          </th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Team</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.filter(user => user.status === 'active').map(user => (
                          <tr 
                            key={user.id} 
                            className={`table-row ${selectedUsers.includes(user.id) ? 'selected' : ''}`}
                            onClick={() => toggleUserSelect(user.id)}
                          >
                            <td>
                              <input 
                                type="checkbox" 
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => toggleUserSelect(user.id)}
                              />
                            </td>
                            <td>
                              <div className="user-info">
                                <div className="user-avatar small">{user.avatar}</div>
                                <span>{user.name}</span>
                              </div>
                            </td>
                            <td>
                              <span className="username">@{user.username}</span>
                            </td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`role-badge ${user.role.toLowerCase()}`}>
                                {user.role}
                              </span>
                            </td>
                            <td>{user.team}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedUsers.length > 0 && (
                    <div className="cost-preview">
                      <span>Selected {selectedUsers.length} users • Total cost: </span>
                      <span className="cost-amount">€{calculateCost().toFixed(2)}/month</span>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
        
        <div className="modal-footer">
          {selectedModule ? (
            <>
              <button className="btn btn-outline" onClick={() => setSelectedModule(null)}>
                Back
              </button>
              <button 
                className="btn btn-primary"
                disabled={selectedModule.type !== 'organization' && selectedUsers.length === 0}
              >
                Add Module ({selectedUsers.length} users)
              </button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={closeModal}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Manage Module Modal - List View
  const ManageModuleListModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Manage CRM Module</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="module-header">
            <div className="module-icon large">💼</div>
            <div>
              <h3>CRM Module</h3>
              <p>{crmUsers.length} users assigned • €25.00/user/month</p>
            </div>
          </div>

          <div className="section">
            <h4>User Access Management</h4>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Access</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Team</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    const hasAccess = crmUsers.includes(user.id);
                    return (
                      <tr key={user.id} className={`table-row ${hasAccess ? 'has-access' : ''}`}>
                        <td>
                          <input 
                            type="checkbox" 
                            checked={hasAccess}
                            disabled={user.status === 'inactive'}
                            onChange={() => console.log('Toggle access for', user.id)}
                          />
                        </td>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar small">{user.avatar}</div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="username">@{user.username}</span>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role.toLowerCase()}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.team}</td>
                        <td>
                          <span className={`status-badge ${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          {user.status === 'active' && (
                            <button 
                              className={`btn btn-sm ${hasAccess ? 'btn-danger' : 'btn-primary'}`}
                              onClick={() => console.log(hasAccess ? 'Remove' : 'Add', user.id)}
                            >
                              {hasAccess ? 'Remove' : 'Add'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={closeModal}>
            Close
          </button>
          <button className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1>Module Management - Card vs List View</h1>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setActiveModal('addProductsCard')}
        >
          Add Products (Card View)
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={() => setActiveModal('addProductsList')}
        >
          Add Products (List View)
        </button>
        
        <button 
          className="btn btn-outline"
          onClick={() => setActiveModal('manageModuleList')}
        >
          Manage CRM (List View)
        </button>
      </div>

      {activeModal === 'addProductsCard' && <AddMoreProductsCardModal />}
      {activeModal === 'addProductsList' && <AddMoreProductsListModal />}
      {activeModal === 'manageModuleList' && <ManageModuleListModal />}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content.large {
          max-width: 800px;
        }

        .modal-header {
          padding: 20px 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .close-btn {
          background: #f5f5f9;
          border: 1px solid #e1e4e8;
          border-radius: 6px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #666;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-footer {
          padding: 0 20px 20px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .modal-description {
          margin-bottom: 20px;
          color: #666;
        }

        /* Card View Styles */
        .modules-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .module-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 2px solid #e1e4e8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .module-item:hover {
          border-color: #6c5ce7;
          background-color: #f8f9fa;
        }

        .module-icon {
          font-size: 24px;
          margin-right: 12px;
          width: 40px;
          text-align: center;
        }

        .module-icon.large {
          font-size: 32px;
          margin-right: 16px;
          width: 50px;
        }

        .module-icon.small {
          font-size: 20px;
          margin-right: 8px;
          width: 30px;
        }

        .module-info {
          flex: 1;
        }

        .module-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .module-price {
          color: #6c5ce7;
          font-size: 14px;
          font-weight: 500;
        }

        .module-arrow {
          color: #999;
          font-size: 18px;
        }

        .users-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .user-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px;
          border: 2px solid #e1e4e8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .user-card:hover {
          border-color: #6c5ce7;
        }

        .user-card.selected {
          border-color: #6c5ce7;
          background-color: #f5f5f9;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #6c5ce7;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .user-avatar.small {
          width: 32px;
          height: 32px;
          margin-bottom: 0;
          margin-right: 8px;
          font-size: 14px;
        }

        .user-name {
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          line-height: 1.2;
        }

        .selected-check {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 20px;
          height: 20px;
          background-color: #6c5ce7;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        /* List View Styles */
        .table-container {
          overflow-x: auto;
          border: 1px solid #e1e4e8;
          border-radius: 8px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .data-table th {
          background-color: #f8f9fa;
          border-bottom: 1px solid #e1e4e8;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
        }

        .data-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        .table-row {
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .table-row:hover {
          background-color: #f8f9fa;
        }

        .table-row.selected {
          background-color: #f0f9ff;
        }

        .table-row.has-access {
          background-color: #f0f9f5;
        }

        .user-info {
          display: flex;
          align-items: center;
        }

        .username {
          color: #6c5ce7;
          font-weight: 500;
        }

        .type-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .type-badge.org {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .type-badge.user {
          background-color: #f3e8ff;
          color: #7c3aed;
        }

        .role-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .role-badge.admin {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .role-badge.owner {
          background-color: #fef3c7;
          color: #d97706;
        }

        .role-badge.user {
          background-color: #e5e7eb;
          color: #374151;
        }

        .status-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.active {
          background-color: #dcfce7;
          color: #16a34a;
        }

        .status-badge.inactive {
          background-color: #f3f4f6;
          color: #6b7280;
        }

        /* Common Styles */
        .selected-module {
          display: flex;
          align-items: center;
          padding: 16px;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .selected-module h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
        }

        .selected-module p {
          margin: 0;
          color: #6c5ce7;
          font-weight: 500;
        }

        .org-module-info {
          text-align: center;
          padding: 20px;
          background-color: #f0f9ff;
          border-radius: 8px;
          color: #0369a1;
        }

        .section-title {
          font-weight: 600;
          margin-bottom: 16px;
        }

        .cost-preview {
          text-align: center;
          padding: 12px;
          background-color: #f8f9fa;
          border-radius: 6px;
          font-weight: 500;
          margin-top: 16px;
        }

        .cost-amount {
          color: #6c5ce7;
          font-weight: 600;
        }

        .module-header {
          display: flex;
          align-items: center;
          padding: 16px;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .module-header h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
        }

        .module-header p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .section {
          margin-bottom: 24px;
        }

        .section h4 {
          margin: 0 0 12px 0;
          font-size: 16px;
          font-weight: 600;
        }

        .btn {
          padding: 10px 16px;
          border-radius: 6px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 12px;
        }

        .btn-primary {
          background-color: #6c5ce7;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #5b4bd5;
        }

        .btn-outline {
          background-color: white;
          border: 1px solid #e1e4e8;
          color: #333;
        }

        .btn-outline:hover {
          border-color: #d1d5db;
          background-color: #f9fafb;
        }

        .btn-danger {
          background-color: #dc2626;
          color: white;
        }

        .btn-danger:hover {
          background-color: #b91c1c;
        }
      `}</style>
    </div>
  );
};

export default ModuleManagementListView; 