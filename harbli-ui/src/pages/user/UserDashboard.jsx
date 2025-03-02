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
      <div className="dashboard-header">
        <h1>Welcome back, {rooms.length > 0 ? 'to your Smart Home' : 'to Harbli\'s Home'}</h1>
        <p className="subtitle">Here's what's happening in your home</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <h3>Total Devices</h3>
            <p className="stat-value">{totalDevices}</p>
            <p className="stat-detail">{activeDevices} devices online</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaLightbulb />
          </div>
          <div className="stat-content">
            <h3>Rooms</h3>
            <p className="stat-value">{rooms.length}</p>
            <p className="stat-detail">Managed spaces</p>
          </div>
        </div>

        {Object.entries(deviceTypes).map(([type, count]) => (
          <div key={type} className="stat-card">
            <div className="stat-icon">
              {deviceTypeIcons[type]}
            </div>
            <div className="stat-content">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <p className="stat-value">{count}</p>
              <p className="stat-detail">Connected devices</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rooms-section">
        <div className="section-header">
          <h2>Your Rooms</h2>
          <Link to="/user/room-device-management" className="view-all">
            View All
          </Link>
        </div>

        <div className="rooms-grid">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <div className="room-header">
                <h3>{room.name}</h3>
                <span className="device-count">{room.devices.length} devices</span>
              </div>
              <p className="room-description">{room.description}</p>
              <div className="device-status">
                <div className="status-item">
                  <span className="status-label">Online</span>
                  <span className="status-value">
                    {room.devices.filter(device => device.status === 'online').length}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Offline</span>
                  <span className="status-value">
                    {room.devices.filter(device => device.status === 'offline').length}
                  </span>
                </div>
              </div>
              <div className="device-types">
                {Array.from(new Set(room.devices.map(device => device.type))).map(type => (
                  <span key={type} className="device-type">
                    {deviceTypeIcons[type]}
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <Link to="/user/room-device-management" className="add-room-card">
            <div className="add-content">
              <span className="plus">+</span>
              <span>Add New Room</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 
