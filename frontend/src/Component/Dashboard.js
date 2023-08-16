import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [user_data, setUser_data] = useState(null);

    useEffect(() => {
      const user_data_str = localStorage.getItem('user');
      if (user_data_str) {
        setUser_data(JSON.parse(user_data_str));
      }
    }, []);
  
    return (
      <div>
        {user_data ? (
          <p>Welcome, {user_data.email}!</p>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
    );
  }
export default Dashboard
