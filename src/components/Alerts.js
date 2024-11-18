import React, { useEffect, useState } from 'react';

const Alerts = ({ socket }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on('alert', (data) => {
      setAlerts((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div>
      {alerts.map((alert, index) => (
        <div key={index} style={{ color: 'red' }}>
          🚨 {alert.message}
        </div>
      ))}
    </div>
  );
};

export default Alerts;
