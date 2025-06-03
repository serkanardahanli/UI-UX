import React, { useState } from 'react';

const StripePaymentForm = () => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    email: '',
    billingAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'NL'
    },
    saveCard: true
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate Stripe Elements (in real implementation, these would be Stripe Elements)
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    isValid: false
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCardDataChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value,
      isValid: prev.cardNumber && prev.expiryDate && prev.cvc
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});

    // Simulate Stripe processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          cardholderName: '',
          email: '',
          billingAddress: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'NL'
          },
          saveCard: true
        });
        setCardData({
          cardNumber: '',
          expiryDate: '',
          cvc: '',
          isValid: false
        });
      }, 2000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h2>Payment Method Added Successfully!</h2>
        <p>Your payment method has been securely saved and is ready to use.</p>
        <div className="card-preview">
          <div className="card-icon">💳</div>
          <div className="card-info">
            <div className="card-brand">Visa</div>
            <div className="card-last4">•••• •••• •••• 4242</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-form-container">
      <div className="form-header">
        <h2>Add Payment Method</h2>
        <p>Your payment information is processed securely by Stripe. We never store your card details.</p>
        <div className="security-badges">
          <div className="security-badge">
            <span className="badge-icon">🔒</span>
            <span>256-bit SSL</span>
          </div>
          <div className="security-badge">
            <span className="badge-icon">🛡️</span>
            <span>PCI Compliant</span>
          </div>
          <div className="security-badge">
            <span className="badge-icon">⚡</span>
            <span>Powered by Stripe</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        {/* Cardholder Information */}
        <div className="form-section">
          <h3>Cardholder Information</h3>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@company.com"
              required
            />
          </div>
        </div>

        {/* Card Information - Stripe Elements would go here */}
        <div className="form-section">
          <h3>Card Information</h3>
          
          <div className="stripe-elements-container">
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <div className="stripe-element card-number">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.cardNumber}
                  onChange={(e) => handleCardDataChange('cardNumber', e.target.value)}
                  maxLength="19"
                />
                <div className="card-brands">
                  <span className="card-brand visa">💳</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <div className="stripe-element">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={cardData.expiryDate}
                    onChange={(e) => handleCardDataChange('expiryDate', e.target.value)}
                    maxLength="7"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">CVC</label>
                <div className="stripe-element">
                  <input
                    type="text"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={(e) => handleCardDataChange('cvc', e.target.value)}
                    maxLength="4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="stripe-info">
            <div className="info-icon">ℹ️</div>
            <p>Card details are handled securely by Stripe. Your information is encrypted and never stored on our servers.</p>
          </div>
        </div>

        {/* Billing Address */}
        <div className="form-section">
          <h3>Billing Address</h3>
          
          <div className="form-group">
            <label className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              value={formData.billingAddress.line1}
              onChange={(e) => handleInputChange('billingAddress.line1', e.target.value)}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address Line 2 (Optional)</label>
            <input
              type="text"
              className="form-control"
              value={formData.billingAddress.line2}
              onChange={(e) => handleInputChange('billingAddress.line2', e.target.value)}
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                value={formData.billingAddress.city}
                onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                placeholder="Amsterdam"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                value={formData.billingAddress.postal_code}
                onChange={(e) => handleInputChange('billingAddress.postal_code', e.target.value)}
                placeholder="1012 AB"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">State/Province</label>
              <input
                type="text"
                className="form-control"
                value={formData.billingAddress.state}
                onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                placeholder="North Holland"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <select
                className="form-control"
                value={formData.billingAddress.country}
                onChange={(e) => handleInputChange('billingAddress.country', e.target.value)}
                required
              >
                <option value="NL">Netherlands</option>
                <option value="BE">Belgium</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Card Option */}
        <div className="form-section">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="saveCard"
              checked={formData.saveCard}
              onChange={(e) => handleInputChange('saveCard', e.target.checked)}
            />
            <label htmlFor="saveCard" className="checkbox-label">
              Save this payment method for future use
            </label>
          </div>
          <p className="checkbox-help">
            We'll securely save a token reference to your card for faster checkout. 
            Your actual card details are never stored on our servers.
          </p>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className={`btn btn-primary ${isProcessing ? 'processing' : ''}`}
            disabled={isProcessing || !cardData.isValid}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Add Payment Method'
            )}
          </button>
        </div>

        {/* Security Footer */}
        <div className="security-footer">
          <div className="security-text">
            <span className="lock-icon">🔒</span>
            Your payment information is processed by Stripe, our trusted payment processor. 
            FlowQi never sees or stores your card details.
          </div>
        </div>
      </form>

      <style jsx>{`
        .payment-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-header h2 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 600;
          color: #1a1d26;
        }

        .form-header p {
          margin: 0 0 20px 0;
          color: #6b7280;
          font-size: 14px;
        }

        .security-badges {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .security-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background-color: #f3f4f6;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          color: #374151;
        }

        .badge-icon {
          font-size: 14px;
        }

        .payment-form {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 24px;
        }

        .form-section {
          margin-bottom: 32px;
        }

        .form-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-control:focus {
          outline: none;
          border-color: #6c5ce7;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .stripe-elements-container {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          background-color: #fafbfc;
        }

        .stripe-element {
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 12px 16px;
          position: relative;
        }

        .stripe-element input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 16px;
        }

        .stripe-element.card-number {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-brands {
          display: flex;
          gap: 4px;
        }

        .card-brand {
          font-size: 18px;
          opacity: 0.6;
        }

        .stripe-info {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 12px;
          padding: 12px;
          background-color: #f0f9ff;
          border-radius: 6px;
        }

        .info-icon {
          font-size: 16px;
          flex-shrink: 0;
        }

        .stripe-info p {
          margin: 0;
          font-size: 13px;
          color: #0369a1;
          line-height: 1.4;
        }

        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
        }

        .checkbox-group input[type="checkbox"] {
          margin-top: 2px;
        }

        .checkbox-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
        }

        .checkbox-help {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
        }

        .form-actions {
          text-align: center;
          margin-bottom: 24px;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 200px;
          position: relative;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background-color: #6c5ce7;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #5b4bd5;
        }

        .btn.processing {
          color: transparent;
        }

        .spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .security-footer {
          text-align: center;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .security-text {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .lock-icon {
          font-size: 14px;
        }

        .success-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 40px 20px;
          text-align: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .success-container h2 {
          margin: 0 0 12px 0;
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
        }

        .success-container p {
          margin: 0 0 24px 0;
          color: #6b7280;
          font-size: 16px;
        }

        .card-preview {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background-color: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .card-icon {
          font-size: 24px;
        }

        .card-info {
          text-align: left;
        }

        .card-brand {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .card-last4 {
          font-size: 14px;
          color: #6b7280;
          font-family: monospace;
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .security-badges {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default StripePaymentForm; 