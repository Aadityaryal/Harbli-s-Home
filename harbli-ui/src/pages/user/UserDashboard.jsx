// UserDashboard.jsx 

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from '@nivo/line';
import { Pie } from '@nivo/pie';
import CountUp from 'react-countup';
import { 
  FiBell, FiSettings, FiMenu, FiHome, FiPower, 
  FiActivity, FiUsers, FiCalendar, FiBox,
  FiChevronRight, FiChevronLeft, FiMaximize, FiMinimize
} from 'react-icons/fi';
import '../../styles/UserDashboard.css';

const UserDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [metrics, setMetrics] = useState({
    activeDevices: 0,
    rooms: 0,
    energyUsage: 0,
    automations: 0
  });

  const [energyData] = useState([
    { x: 'Mon', y: 30 },
    { x: 'Tue', y: 40 },
    { x: 'Wed', y: 35 },
    { x: 'Thu', y: 45 },
    { x: 'Fri', y: 25 },
    { x: 'Sat', y: 20 },
    { x: 'Sun', y: 38 },
  ]);

  const [deviceUsage] = useState([
    { id: 'Lights', value: 35 },
    { id: 'AC', value: 25 },
    { id: 'TV', value: 15 },
    { id: 'Others', value: 25 },
  ]);

  const notifications = [
    { id: 1, message: 'Living Room AC temperature adjusted', time: '2 mins ago' },
    { id: 2, message: 'New device detected in Kitchen', time: '15 mins ago' },
    { id: 3, message: 'Energy usage alert in Bedroom', time: '1 hour ago' },
  ];

  useEffect(() => {
    const loadMetrics = () => {
      setTimeout(() => {
        setMetrics({
          activeDevices: 12,
          rooms: 5,
          energyUsage: 450,
          automations: 8
        });
      }, 1000);
    };

    loadMetrics();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const sidebarItems = [
    { icon: <FiHome />, label: 'Dashboard' },
    { icon: <FiBox />, label: 'Devices' },
    { icon: <FiUsers />, label: 'Rooms' },
    { icon: <FiActivity />, label: 'Analytics' },
    { icon: <FiCalendar />, label: 'Schedule' },
  ];

  return (
    <div className="dashboard-container">
      <motion.aside 
        className={`dashboard-sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="sidebar-header">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Harbli's Home
          </motion.h1>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={index}
              className="nav-item"
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      <main className="dashboard-main">
        <motion.header 
          className="dashboard-header"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="header-title">
            <FiMenu className="menu-icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
            Dashboard
          </div>
          <div className="header-actions">
            <motion.button
              className="icon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FiBell />
              <span className="notification-badge">3</span>
            </motion.button>

            <motion.button
              className="icon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSettings(!showSettings)}
            >
              <FiSettings />
            </motion.button>

            <motion.button
              className="icon-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <FiMinimize /> : <FiMaximize />}
            </motion.button>

            <motion.div 
              className="user-profile"
              whileHover={{ scale: 1.1 }}
            >
              <img src="/default-avatar.png" alt="User" />
            </motion.div>
          </div>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                className="notifications-panel"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3>Notifications</h3>
                {notifications.map(notif => (
                  <motion.div 
                    key={notif.id}
                    className="notification-item"
                    whileHover={{ backgroundColor: 'var(--light-gray)' }}
                  >
                    <p>{notif.message}</p>
                    <span>{notif.time}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {showSettings && (
              <motion.div 
                className="settings-panel"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3>Quick Settings</h3>
                <div className="settings-options">
                  <label className="setting-item">
                    <span>Dark Mode</span>
                    <input type="checkbox" />
                  </label>
                  <label className="setting-item">
                    <span>Notifications</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="setting-item">
                    <span>Auto-lock</span>
                    <input type="checkbox" />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <div className="dashboard-content">
          <div className="metrics-grid">
            {Object.entries(metrics).map(([key, value], index) => (
              <motion.div
                key={key}
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="metric-title">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="metric-value">
                  <CountUp end={value} duration={2} />
                  {key === 'energyUsage' && ' kWh'}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="charts-container">
            <motion.div 
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Energy Usage Trend</h3>
              <div className="chart-wrapper">
                <Line
                  data={[{ id: 'energy', data: energyData }]}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                  curve="cardinal"
                  enablePointLabel={true}
                  pointSize={8}
                  pointColor="white"
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  enableGridX={false}
                  theme={{
                    axis: { ticks: { text: { fill: '#666' } } },
                    grid: { line: { stroke: '#ddd' } },
                  }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Device Usage Distribution</h3>
              <div className="chart-wrapper">
                <Pie
                  data={deviceUsage}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ scheme: 'nivo' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableArcLinkLabels={true}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard; 
