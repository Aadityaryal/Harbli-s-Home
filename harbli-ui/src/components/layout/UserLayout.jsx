import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaHome, FaCog, FaChartLine, FaBars, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './UserLayout.css';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { userData } = useUser();

  const navigation = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/room-device-management', icon: <FaChartLine />, label: 'Rooms & Devices' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <div className="user-layout">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="brand">
            <FaHome /> Harbli's Home
          </Link>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <img 
              src={userData.profilePicture || 'https://via.placeholder.com/40'} 
              alt={userData.name}
              className="user-avatar"
            />
            <span className="user-name">{userData.name}</span>
          </div>
        </div>
      </aside>

      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="top-header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars />
            </button>
          </div>
          <div className="header-actions">
            <button className="action-button">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <Link to="/auth" className="action-button">
              <FaSignOutAlt />
            </Link>
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout; 