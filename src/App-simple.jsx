import React from 'react';

// Ultra simple version that MUST work
export default function App() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
        🎉 FlowQi Dashboard - SIMPLE VERSION WORKING!
      </h1>
      
      <p style={{ fontSize: '18px', marginBottom: '15px' }}>
        ✅ Back to PRE-CRM version
      </p>
      
      <p style={{ fontSize: '18px', marginBottom: '15px' }}>
        ✅ Reset to commit bcc00d6 (working version)
      </p>
      
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        ✅ Testing if simple React works
      </p>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#059669', marginBottom: '15px' }}>
          Test Status
        </h2>
        
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>
          If you see this page: <strong>Basic React + Vercel works!</strong>
        </p>
        
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Next step: Switch to original app WITHOUT CRM module
        </p>

        <button 
          onClick={() => alert('JavaScript works!')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#2563eb', 
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          🧪 Test JS Function
        </button>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#dcfce7',
        borderRadius: '6px',
        border: '1px solid #22c55e'
      }}>
        <p style={{ margin: '0', color: '#166534' }}>
          <strong>Status:</strong> Pre-CRM version loaded. 
          If this works, we know the issue was in CRM module changes!
        </p>
      </div>
    </div>
  );
}