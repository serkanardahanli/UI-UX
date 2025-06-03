import React, { useState } from 'react';

const CancelSubscriptionFlow = ({ setCurrentView }) => {
  const [currentStep, setCurrentStep] = useState('initial'); // 'initial', 'confirmation', 'success'
  const [confirmationText, setConfirmationText] = useState('');

  const closeModal = () => {
    setCurrentStep('initial');
    setConfirmationText('');
  };

  const proceedToConfirmation = () => {
    setCurrentStep('confirmation');
  };

  const confirmCancellation = () => {
    setCurrentStep('success');
  };

  // Step 1: Initial Cancel Subscription Modal
  const InitialCancelModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Cancel your FlowQi subscription?</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-body">
          <p className="cancel-description">
            You'll still have access to <strong>FlowQi Professional</strong> until December 21, 2024. You'll 
            then be downgraded to <strong>Free</strong> and lose the following features:
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">×</span>
              <span>Advanced user management and permissions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">×</span>
              <span>Sales Tool and Marketing automation</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">×</span>
              <span>Support Tool and ticket management</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">×</span>
              <span>Advanced analytics and reporting</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">×</span>
              <span>FlowQi Docs and Forms</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">×</span>
              <span>Priority support and integrations</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={closeModal}>
            Keep my subscription
          </button>
          <button className="btn btn-danger" onClick={proceedToConfirmation}>
            Cancel my subscription
          </button>
        </div>
      </div>
    </div>
  );

  // Step 2: Confirmation Modal
  const ConfirmationModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Cancel all subscriptions and delete data?</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="warning-box">
            <div className="warning-icon">⚠️</div>
            <div className="warning-content">
              <h3>This will permanently delete:</h3>
              <ul>
                <li>All user accounts and data</li>
                <li>All company data and projects</li>
                <li>All stored documents and files</li>
                <li>All billing history and invoices</li>
                <li>All integrations and configurations</li>
              </ul>
            </div>
          </div>

          <div className="reactivation-info">
            <div className="info-icon">ℹ️</div>
            <p>
              <strong>Good news:</strong> You can always reactivate your account by logging into the 
              admin panel at any time. Your company profile will be preserved for future reactivation.
            </p>
          </div>

          <div className="confirmation-section">
            <label className="confirmation-label">
              To confirm deletion, please type "delete everything" below:
            </label>
            <input 
              type="text" 
              className="confirmation-input"
              placeholder="Type: delete everything"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={() => setCurrentStep('initial')}>
            Go back
          </button>
          <button 
            className="btn btn-danger" 
            onClick={confirmCancellation}
            disabled={confirmationText !== 'delete everything'}
          >
            Delete everything
          </button>
        </div>
      </div>
    </div>
  );

  // Step 3: Success/Completion Modal
  const SuccessModal = () => (
    <div className="modal-overlay">
      <div className="modal-content success">
        <div className="modal-header">
          <h2>Subscription canceled</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="success-illustration">
            <div className="ghost-icon">👻</div>
            <div className="sparkles">✨</div>
          </div>
          
          <p className="success-message">
            We're sorry it didn't work out. Your subscription has been canceled and 
            all data will be deleted at the end of your billing period on 
            <strong> December 22, 2024</strong>. 
          </p>

          <p className="reactivation-message">
            You can reactivate your subscription by going to 
            <strong> Admin Panel → Settings → Subscription</strong>.
          </p>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-primary full-width" onClick={closeModal}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-2"
              >
                ← Back to Dashboard
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">FlowQi Cancel Subscription Flow</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscription Management</h2>
            <p className="text-gray-600 mb-6">
              Manage your FlowQi subscription. Click the button below to start the cancellation process.
            </p>
            
            <button 
              className="btn btn-danger"
              onClick={() => setCurrentStep('initial')}
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {currentStep === 'initial' && <InitialCancelModal />}
      {currentStep === 'confirmation' && <ConfirmationModal />}
      {currentStep === 'success' && <SuccessModal />}

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
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content.success {
          text-align: center;
        }

        .modal-header {
          padding: 24px 24px 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #1a1d26;
          line-height: 1.3;
          flex: 1;
          padding-right: 16px;
        }

        .close-btn {
          background: #f5f5f9;
          border: 1px solid #e1e4e8;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          color: #666;
          flex-shrink: 0;
        }

        .modal-body {
          padding: 0 24px 24px;
        }

        .modal-footer {
          padding: 16px 24px 24px;
          display: flex;
          gap: 12px;
        }

        .cancel-description {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .features-list {
          margin-bottom: 24px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          color: #4a5568;
        }

        .feature-icon {
          width: 20px;
          height: 20px;
          background-color: #fee2e2;
          color: #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 12px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .warning-box {
          background-color: #fef2f2;
          border: 2px solid #fecaca;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          display: flex;
          gap: 16px;
        }

        .warning-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .warning-content h3 {
          margin: 0 0 12px 0;
          color: #dc2626;
          font-size: 16px;
          font-weight: 600;
        }

        .warning-content ul {
          margin: 0;
          padding-left: 20px;
          color: #7f1d1d;
        }

        .warning-content li {
          margin-bottom: 6px;
        }

        .reactivation-info {
          background-color: #f0f9ff;
          border: 2px solid #bae6fd;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .reactivation-info p {
          margin: 0;
          color: #0c4a6e;
          line-height: 1.5;
        }

        .confirmation-section {
          margin-top: 24px;
        }

        .confirmation-label {
          display: block;
          margin-bottom: 12px;
          font-weight: 500;
          color: #374151;
        }

        .confirmation-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .confirmation-input:focus {
          outline: none;
          border-color: #6c5ce7;
        }

        .success-illustration {
          position: relative;
          margin: 20px 0 32px;
        }

        .ghost-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .sparkles {
          position: absolute;
          top: -10px;
          right: 30%;
          font-size: 24px;
          opacity: 0.7;
        }

        .success-message {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .reactivation-message {
          color: #6c5ce7;
          font-weight: 500;
          line-height: 1.6;
          margin-bottom: 0;
        }

        .btn {
          padding: 12px 20px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-outline {
          background-color: white;
          border: 2px solid #e5e7eb;
          color: #374151;
        }

        .btn-outline:hover:not(:disabled) {
          border-color: #d1d5db;
          background-color: #f9fafb;
        }

        .btn-danger {
          background-color: #dc2626;
          color: white;
        }

        .btn-danger:hover:not(:disabled) {
          background-color: #b91c1c;
        }

        .btn-primary {
          background-color: #6c5ce7;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #5b4bd5;
        }

        .full-width {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default CancelSubscriptionFlow; 