import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaUsers, FaCog, FaHome, FaBars, FaBell, FaSignOutAlt } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { path: '/admin/user-management', icon: <FaUsers />, label: 'User Management' },
    { path: '/admin/room-device-management', icon: <FaCog />, label: 'Rooms & Devices' },
  ];

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin/user-management" className="brand">
            <FaHome /> Harbli Admin
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
          <div className="admin-info">
            <span className="admin-label">Administrator</span>
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
              <span className="notification-badge">2</span>
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

export default AdminLayout; 