// AdminDashboard.jsx 

import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartLine } from 'react-icons/fa';
import { MdDevices, MdRoom } from 'react-icons/md';
import { Line } from '@nivo/line';
import CountUp from 'react-countup';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
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

      setIsLoading(false);
    }, 1000);
  }, []);

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
      colors={['#0284c7']}
      pointSize={8}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor="#0284c7"
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
    />
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="admin-dashboard-subtitle">Monitor and manage your smart home system</p>
      </div>

      <div className="admin-dashboard-stats-grid">
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            <FaUsers />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Total Users</h3>
            <CountUp 
              end={dashboardData.totalUsers} 
              duration={2} 
              className="admin-dashboard-stat-value"
            />
            <p className="admin-dashboard-stat-detail">+12% this month</p>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            <MdDevices />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Active Devices</h3>
            <CountUp 
              end={dashboardData.activeDevices} 
              duration={2} 
              className="admin-dashboard-stat-value"
            />
            <p className="admin-dashboard-stat-detail">+8% this week</p>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            <MdRoom />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Room Count</h3>
            <CountUp 
              end={dashboardData.roomCount} 
              duration={2} 
              className="admin-dashboard-stat-value"
            />
            <p className="admin-dashboard-stat-detail">+5% this month</p>
          </div>
        </div>
      </div>

      <div className="admin-dashboard-chart-section">
        <div className="admin-dashboard-chart-header">
          <h2>Device Usage Trends</h2>
          <FaChartLine />
        </div>
        <div className="admin-dashboard-chart-container">
          {!isLoading && <LineChart data={usageData} />}
        </div>
      </div>

      <div className="admin-dashboard-activity-section">
        <h2>Recent Activity</h2>
        <div className="admin-dashboard-activity-list">
          {dashboardData.recentActivity.map(activity => (
            <div key={activity.id} className="admin-dashboard-activity-item">
              <div className="admin-dashboard-activity-icon">
                <MdDevices />
              </div>
              <div className="admin-dashboard-activity-content">
                <h4 className="admin-dashboard-activity-title">{activity.action}</h4>
                <p className="admin-dashboard-activity-details">{activity.details}</p>
                <span className="admin-dashboard-activity-time">{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
