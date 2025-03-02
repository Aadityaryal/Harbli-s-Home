import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, FaCamera, FaLock, FaBell, FaCog, FaHome, FaSignOutAlt,
  FaToggleOn, FaToggleOff, FaCheck, FaTimes, FaChevronRight
} from 'react-icons/fa';
import '../../styles/UserSettings.css';

const UserSettings = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: null
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    securityQuestions: [
      { question: 'What was your first pet\'s name?', answer: '' },
      { question: 'In which city were you born?', answer: '' }
    ]
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsAlerts: false,
    deviceUpdates: true,
    weeklyReports: true,
    darkMode: false
  });

  const [activeSection, setActiveSection] = useState('profile');
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Add API call here
    showNotification('Profile updated successfully!', 'success');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }
    // Add API call here
    showNotification('Password changed successfully!', 'success');
    setSecurityData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleTwoFactorToggle = () => {
    setSecurityData(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
    showNotification(
      `Two-factor authentication ${!securityData.twoFactorEnabled ? 'enabled' : 'disabled'}!`,
      'success'
    );
  };

  const handlePreferenceToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    showNotification('Preferences updated!', 'success');
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Add API call here for image upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
      showNotification('Profile picture updated!', 'success');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="user-settings">
      {/* Top Navigation */}
      <header className="settings-header">
        <div className="header-content">
          <Link to="/dashboard" className="brand-link">
            <FaHome /> Harbli's Home
          </Link>
          <h1>User Settings</h1>
        </div>
        <div className="nav-actions">
          <Link to="/dashboard" className="nav-link" title="Dashboard">
            <FaHome />
          </Link>
          <Link to="/user/room-device-management" className="nav-link" title="Room & Devices">
            <FaCog />
          </Link>
          <button className="nav-button" title="Logout">
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/dashboard">Home</Link>
        <FaChevronRight className="breadcrumb-separator" />
        <span>Settings</span>
      </nav>

      {/* Main Content */}
      <main className="settings-content">
        {/* Section Navigation */}
        <nav className="settings-nav">
          <button
            className={`nav-button ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <FaUser /> Profile Information
          </button>
          <button
            className={`nav-button ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <FaLock /> Account Security
          </button>
          <button
            className={`nav-button ${activeSection === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveSection('preferences')}
          >
            <FaBell /> Preferences
          </button>
        </nav>

        {/* Profile Section */}
        <section className={`settings-section ${activeSection === 'profile' ? 'active' : ''}`}>
          <div className="section-header">
            <h2>Profile Information</h2>
            <p>Manage your personal information and profile picture</p>
          </div>
          <form onSubmit={handleProfileUpdate} className="settings-form">
            <div className="profile-picture">
              <div className="picture-container">
                {profileData.profilePicture ? (
                  <img src={profileData.profilePicture} alt="Profile" />
                ) : (
                  <FaUser className="default-avatar" />
                )}
                <label className="picture-upload">
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    hidden
                  />
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </form>
        </section>

        {/* Security Section */}
        <section className={`settings-section ${activeSection === 'security' ? 'active' : ''}`}>
          <div className="section-header">
            <h2>Account Security</h2>
            <p>Manage your password and security settings</p>
          </div>
          <div className="security-options">
            <form onSubmit={handlePasswordChange} className="settings-form">
              <h3>Change Password</h3>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Update Password
              </button>
            </form>

            <div className="security-option">
              <div className="option-header">
                <h3>Two-Factor Authentication</h3>
                <button
                  className={`toggle-button ${securityData.twoFactorEnabled ? 'active' : ''}`}
                  onClick={handleTwoFactorToggle}
                >
                  {securityData.twoFactorEnabled ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>
              <p>Add an extra layer of security to your account</p>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className={`settings-section ${activeSection === 'preferences' ? 'active' : ''}`}>
          <div className="section-header">
            <h2>Preferences</h2>
            <p>Customize your notification and display settings</p>
          </div>
          <div className="preferences-list">
            <div className="preference-item">
              <div className="preference-info">
                <h3>Email Notifications</h3>
                <p>Receive updates and alerts via email</p>
              </div>
              <button
                className={`toggle-button ${preferences.emailNotifications ? 'active' : ''}`}
                onClick={() => handlePreferenceToggle('emailNotifications')}
              >
                {preferences.emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            <div className="preference-item">
              <div className="preference-info">
                <h3>SMS Alerts</h3>
                <p>Get important notifications via SMS</p>
              </div>
              <button
                className={`toggle-button ${preferences.smsAlerts ? 'active' : ''}`}
                onClick={() => handlePreferenceToggle('smsAlerts')}
              >
                {preferences.smsAlerts ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            <div className="preference-item">
              <div className="preference-info">
                <h3>Device Updates</h3>
                <p>Notifications about device status changes</p>
              </div>
              <button
                className={`toggle-button ${preferences.deviceUpdates ? 'active' : ''}`}
                onClick={() => handlePreferenceToggle('deviceUpdates')}
              >
                {preferences.deviceUpdates ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            <div className="preference-item">
              <div className="preference-info">
                <h3>Weekly Reports</h3>
                <p>Receive weekly usage and activity reports</p>
              </div>
              <button
                className={`toggle-button ${preferences.weeklyReports ? 'active' : ''}`}
                onClick={() => handlePreferenceToggle('weeklyReports')}
              >
                {preferences.weeklyReports ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            <div className="preference-item">
              <div className="preference-info">
                <h3>Dark Mode</h3>
                <p>Switch between light and dark themes</p>
              </div>
              <button
                className={`toggle-button ${preferences.darkMode ? 'active' : ''}`}
                onClick={() => handlePreferenceToggle('darkMode')}
              >
                {preferences.darkMode ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? <FaCheck /> : <FaTimes />}
          </span>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default UserSettings; 