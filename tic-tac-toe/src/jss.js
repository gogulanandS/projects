import React, { useState } from 'react';

function App() {
  // useState hook: manages two pieces of state
  // isLoggedIn: tracks login status (true/false)
  // username: stores the entered username
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Event handler for username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Event handler for login button
  const handleLogin = () => {
    // Only login if username is not empty
    if (username.trim() !== '') {
      setIsLoggedIn(true);
    }
  };

  // Event handler for logout button
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(''); // Clear username on logout
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>Login System</h1>
      
      {/* CONDITIONAL RENDERING #1: if-else logic */}
      {isLoggedIn ? (
        // Logged in state
        <div>
          <h2>Welcome {username}!</h2>
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#ff4444', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
          
          {/* CONDITIONAL RENDERING #3: Logical AND (&&) operator */}
          {/* Only shows when isLoggedIn is true */}
          {isLoggedIn && (
            <p style={{ color: 'green', marginTop: '15px' }}>
              ✅ You have access to premium features!
            </p>
          )}
        </div>
      ) : (
        // Logged out state
        <div>
          <h2>Please Login</h2>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              style={{
                padding: '10px',
                width: '200px',
                border: '2px solid #ccc',
                borderRadius: '5px',
                marginRight: '10px'
              }}
            />
            <button
              onClick={handleLogin}
              disabled={username.trim() === ''} // Disable if empty
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                opacity: username.trim() === '' ? 0.5 : 1
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;