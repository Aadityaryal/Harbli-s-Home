import React, { useState } from 'react';
import { FaUser, FaBell, FaPalette, FaShieldAlt, FaSave } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import '../../styles/UserSettings.css';

const UserSettings = () => {
  const { userData, preferences, updateUserData, updatePreferences } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserData({
      name: formData.name,
      email: formData.email,
      profilePicture: profileImage || userData.profilePicture,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add password update logic here
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleNotificationChange = (key) => {
    updatePreferences({
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      },
    });
  };

  const handleThemeChange = (key) => {
    updatePreferences({
      theme: {
        ...preferences.theme,
        [key]: !preferences.theme[key],
      },
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
  ];

  return (
    <div className="user-settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-container">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="settings-form">
              <div className="profile-image-section">
                <div className="profile-image">
                  <img
                    src={profileImage || userData.profilePicture || 'https://via.placeholder.com/150'}
                    alt={userData.name}
                  />
                  <label className="image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                    Change Photo
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="save-button">
                <FaSave /> Save Changes
              </button>
            </form>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="preferences-list">
                <label className="preference-item">
                  <span>Email Notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                </label>
                <label className="preference-item">
                  <span>SMS Notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                </label>
                <label className="preference-item">
                  <span>Device Updates</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.deviceUpdates}
                    onChange={() => handleNotificationChange('deviceUpdates')}
                  />
                </label>
                <label className="preference-item">
                  <span>Weekly Reports</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.weeklyReports}
                    onChange={() => handleNotificationChange('weeklyReports')}
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>
              <div className="preferences-list">
                <label className="preference-item">
                  <span>Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={preferences.theme.darkMode}
                    onChange={() => handleThemeChange('darkMode')}
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="settings-form">
              <h2>Change Password</h2>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="save-button">
                <FaSave /> Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings; 