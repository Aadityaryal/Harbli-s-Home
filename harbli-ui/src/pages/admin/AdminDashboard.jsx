// AdminDashboard.jsx 

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaUsers, FaHome, FaChartLine, FaCog, FaBell, FaUser,
  FaSignOutAlt, FaPlus, FaMinus, FaChevronRight
} from 'react-icons/fa';
import { MdDashboard, MdDevices, MdRoom } from 'react-icons/md';
import { Line, Bar } from '@nivo/line';
import CountUp from 'react-countup';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeDevices: 0,
    roomCount: 0,
    recentActivity: []
  });
  const [usageData, setUsageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        totalUsers: 156,
        activeDevices: 423,
        roomCount: 89,
        recentActivity: [
          { id: 1, action: 'User Added', details: 'New user John Doe registered', timestamp: '2 mins ago' },
          { id: 2, action: 'Device Updated', details: 'Living Room Light settings changed', timestamp: '5 mins ago' },
          { id: 3, action: 'Room Added', details: 'New room "Kitchen" added', timestamp: '10 mins ago' },
          { id: 4, action: 'System Update', details: 'Platform version updated to 2.1.0', timestamp: '1 hour ago' }
        ]
      });

      setUsageData([
        { x: 'Jan', y: 120 },
        { x: 'Feb', y: 180 },
        { x: 'Mar', y: 240 },
        { x: 'Apr', y: 300 },
        { x: 'May', y: 280 },
        { x: 'Jun', y: 350 }
      ]);

      setNotifications([
        { id: 1, message: 'New user registration', type: 'info', time: '2 mins ago' },
        { id: 2, message: 'System update available', type: 'warning', time: '1 hour ago' }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const LineChart = ({ data }) => (
    <Line
      data={[
        {
          id: 'Device Usage',
          data: data
        }
      ]}
      margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
      }}
      colors={['#002147']}
      pointSize={10}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor="#002147"
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
    />
  );

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Harbli's Home</h2>
          <button className="toggle-button" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaMinus /> : <FaPlus />}
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item active">
            <MdDashboard /> <span>Dashboard</span>
          </Link>
          <Link to="/admin/user-management" className="nav-item">
            <FaUsers /> <span>User Management</span>
          </Link>
          <Link to="/admin/room-device-management" className="nav-item">
            <MdDevices /> <span>Room & Devices</span>
          </Link>
          <Link to="/admin/reports" className="nav-item">
            <FaChartLine /> <span>Reports</span>
          </Link>
          <Link to="/admin/settings" className="nav-item">
            <FaCog /> <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Top Navigation */}
        <header className="top-nav">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h1>Admin Dashboard</h1>
          <div className="nav-actions">
            <button className="nav-button" title="Notifications">
              <FaBell />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
            <button className="nav-button" title="Settings">
              <FaCog />
            </button>
            <button className="nav-button" title="Profile">
              <FaUser />
            </button>
            <button className="nav-button" title="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Overview Cards */}
          <section className="overview-cards">
            <div className="card">
              <div className="card-icon">
                <FaUsers />
              </div>
              <div className="card-content">
                <h3>Total Users</h3>
                <CountUp 
                  end={dashboardData.totalUsers} 
                  duration={2} 
                  className="card-value"
                />
                <p className="card-trend">+12% this month</p>
              </div>
            </div>
            <div className="card">
              <div className="card-icon">
                <MdDevices />
              </div>
              <div className="card-content">
                <h3>Active Devices</h3>
                <CountUp 
                  end={dashboardData.activeDevices} 
                  duration={2} 
                  className="card-value"
                />
                <p className="card-trend">+8% this week</p>
              </div>
            </div>
            <div className="card">
              <div className="card-icon">
                <MdRoom />
              </div>
              <div className="card-content">
                <h3>Room Count</h3>
                <CountUp 
                  end={dashboardData.roomCount} 
                  duration={2} 
                  className="card-value"
                />
                <p className="card-trend">+5% this month</p>
              </div>
            </div>
          </section>

          {/* Charts and Activity */}
          <section className="data-visualization">
            <div className="chart-panel">
              <h2>Device Usage Trends</h2>
              <div className="chart-container">
                {!isLoading && <LineChart data={usageData} />}
              </div>
            </div>
            <div className="activity-panel">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {dashboardData.recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      <FaChevronRight />
                    </div>
                    <div className="activity-details">
                      <h4>{activity.action}</h4>
                      <p>{activity.details}</p>
                      <span className="activity-time">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Notifications Panel */}
          <section className="notifications-panel">
            <h2>System Notifications</h2>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification-item ${notification.type}`}>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
