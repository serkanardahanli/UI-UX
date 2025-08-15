import React, { useState, useEffect } from 'react';

// Ultra minimal debug version to identify the issue
export default function App() {
  const [debugInfo, setDebugInfo] = useState('App starting...');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setDebugInfo('App loaded successfully!');
      
      // Test if modules.json can be imported
      import('./config/modules.json').then(() => {
        setDebugInfo('modules.json loaded successfully!');
      }).catch(err => {
        setError('modules.json import failed: ' + err.message);
      });

      // Test component imports
      import('./pages/PersonalDashboard').then(() => {
        setDebugInfo('PersonalDashboard imported successfully!');
      }).catch(err => {
        setError('PersonalDashboard import failed: ' + err.message);
      });

    } catch (err) {
      setError('React error: ' + err.message);
    }
  }, []);

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fee', 
        color: '#900',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.4'
      }}>
        <h1>🚨 DEBUG: Error Found!</h1>
        <p><strong>Error:</strong> {error}</p>
        <hr />
        <p><strong>Debug Info:</strong> {debugInfo}</p>
        <hr />
        <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
        <p><strong>User Agent:</strong> {navigator.userAgent}</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#efe', 
      color: '#060',
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: '1.4'
    }}>
      <h1>✅ DEBUG: App Working!</h1>
      <p><strong>Status:</strong> {debugInfo}</p>
      <hr />
      <p><strong>Next step:</strong> All imports successful, switching to main app...</p>
      <button 
        onClick={() => window.location.href = window.location.href}
        style={{ 
          padding: '10px 20px', 
          fontSize: '14px',
          backgroundColor: '#060',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reload Page
      </button>
    </div>
  );
}