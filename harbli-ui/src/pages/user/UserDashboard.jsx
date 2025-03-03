// UserDashboard.jsx 

import React from 'react';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaThermometerHalf, FaLock, FaPlug, FaChartLine } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import '../../styles/UserDashboard.css';

const UserDashboard = () => {
  const { rooms } = useUser();

  // Calculate statistics
  const totalDevices = rooms.reduce((acc, room) => acc + room.devices.length, 0);
  const activeDevices = rooms.reduce((acc, room) => 
    acc + room.devices.filter(device => device.status === 'online').length, 0
  );
  const deviceTypes = rooms.reduce((acc, room) => {
    room.devices.forEach(device => {
      acc[device.type] = (acc[device.type] || 0) + 1;
    });
    return acc;
  }, {});

  const deviceTypeIcons = {
    lighting: <FaLightbulb />,
    climate: <FaThermometerHalf />,
    security: <FaLock />,
    power: <FaPlug />,
  };

  return (
    <div className="user-dashboard">
      <div className="user-dashboard-header">
        <h1>Welcome back, {rooms.length > 0 ? 'to your Smart Home' : 'to Harbli\'s Home'}</h1>
        <p className="user-dashboard-subtitle">Here's what's happening in your home</p>
      </div>

      <div className="user-dashboard-stats-grid">
        <div className="user-dashboard-stat-card">
          <div className="user-dashboard-stat-icon">
            <FaChartLine />
          </div>
          <div className="user-dashboard-stat-content">
            <h3>Total Devices</h3>
            <p className="user-dashboard-stat-value">{totalDevices}</p>
            <p className="user-dashboard-stat-detail">{activeDevices} devices online</p>
          </div>
        </div>

        <div className="user-dashboard-stat-card">
          <div className="user-dashboard-stat-icon">
            <FaLightbulb />
          </div>
          <div className="user-dashboard-stat-content">
            <h3>Rooms</h3>
            <p className="user-dashboard-stat-value">{rooms.length}</p>
            <p className="user-dashboard-stat-detail">Managed spaces</p>
          </div>
        </div>

        {Object.entries(deviceTypes).map(([type, count]) => (
          <div key={type} className="user-dashboard-stat-card">
            <div className="user-dashboard-stat-icon">
              {deviceTypeIcons[type]}
            </div>
            <div className="user-dashboard-stat-content">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <p className="user-dashboard-stat-value">{count}</p>
              <p className="user-dashboard-stat-detail">Connected devices</p>
            </div>
          </div>
        ))}
      </div>

      <div className="user-dashboard-rooms-section">
        <div className="user-dashboard-section-header">
          <h2>Your Rooms</h2>
          <Link to="/user/room-device-management" className="user-dashboard-view-all">
            View All
          </Link>
        </div>

        <div className="user-dashboard-rooms-grid">
          {rooms.map(room => (
            <div key={room.id} className="user-dashboard-room-card">
              <div className="user-dashboard-room-header">
                <h3>{room.name}</h3>
                <span className="user-dashboard-device-count">{room.devices.length} devices</span>
              </div>
              <p className="user-dashboard-room-description">{room.description}</p>
              <div className="user-dashboard-device-status">
                <div className="user-dashboard-status-item">
                  <span className="user-dashboard-status-label">Online</span>
                  <span className="user-dashboard-status-value">
                    {room.devices.filter(device => device.status === 'online').length}
                  </span>
                </div>
                <div className="user-dashboard-status-item">
                  <span className="user-dashboard-status-label">Offline</span>
                  <span className="user-dashboard-status-value">
                    {room.devices.filter(device => device.status === 'offline').length}
                  </span>
                </div>
              </div>
              <div className="user-dashboard-device-types">
                {Array.from(new Set(room.devices.map(device => device.type))).map(type => (
                  <span key={type} className="user-dashboard-device-type">
                    {deviceTypeIcons[type]}
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <Link to="/user/room-device-management" className="user-dashboard-add-room-card">
            <div className="user-dashboard-add-content">
              <span className="user-dashboard-plus">+</span>
              <span>Add New Room</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 
