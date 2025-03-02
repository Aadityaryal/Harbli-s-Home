// AdminRoomDeviceManagement.jsx 

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaPlus, FaEdit, FaTrash, FaHome, FaCog, 
  FaBell, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaCheck,
  FaUsers, FaChartLine, FaSearch, FaFilter
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/AdminRoomDeviceManagement.css';

const AdminRoomDeviceManagement = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    type: 'room',
    name: '',
    description: '',
    status: 'active',
    deviceType: '',
    roomId: '',
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setRooms([
          { id: 1, name: 'Living Room', description: 'Main living area', deviceCount: 5, status: 'active' },
          { id: 2, name: 'Kitchen', description: 'Kitchen and dining area', deviceCount: 8, status: 'active' },
          { id: 3, name: 'Master Bedroom', description: 'Primary bedroom', deviceCount: 4, status: 'active' },
        ]);

        setDevices([
          { id: 1, name: 'Smart Light', description: 'Phillips Hue Light', type: 'lighting', roomId: 1, status: 'online' },
          { id: 2, name: 'Thermostat', description: 'Nest Thermostat', type: 'climate', roomId: 1, status: 'online' },
          { id: 3, name: 'Security Camera', description: 'Ring Camera', type: 'security', roomId: 2, status: 'offline' },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and search functionality
  const filteredItems = () => {
    const items = filterType === 'rooms' ? rooms : filterType === 'devices' ? devices : [...rooms, ...devices];
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Modal handlers
  const handleAdd = () => {
    setFormData({
      type: 'room',
      name: '',
      description: '',
      status: 'active',
      deviceType: '',
      roomId: '',
    });
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      type: item.deviceType ? 'device' : 'room',
      name: item.name,
      description: item.description,
      status: item.status,
      deviceType: item.type || '',
      roomId: item.roomId || '',
    });
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call here
    if (showAddModal) {
      // Handle add
      if (formData.type === 'room') {
        setRooms([...rooms, { id: rooms.length + 1, ...formData }]);
      } else {
        setDevices([...devices, { id: devices.length + 1, ...formData }]);
      }
      setShowAddModal(false);
    } else if (showEditModal) {
      // Handle edit
      if (formData.type === 'room') {
        setRooms(rooms.map(room => 
          room.id === selectedItem.id ? { ...room, ...formData } : room
        ));
      } else {
        setDevices(devices.map(device => 
          device.id === selectedItem.id ? { ...device, ...formData } : device
        ));
      }
      setShowEditModal(false);
    }
    setFormData({
      type: 'room',
      name: '',
      description: '',
      status: 'active',
      deviceType: '',
      roomId: '',
    });
  };

  const handleConfirmDelete = async () => {
    // Add API call here
    if (selectedItem.deviceType) {
      setDevices(devices.filter(device => device.id !== selectedItem.id));
    } else {
      setRooms(rooms.filter(room => room.id !== selectedItem.id));
    }
    setShowDeleteModal(false);
  };

  // Render functions
  const renderCard = (item) => {
    const isDevice = 'deviceType' in item || 'type' in item;
    return (
      <motion.div
        className="management-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="card-header">
          <h3>{item.name}</h3>
          <div className="card-actions">
            <button
              className="action-button edit"
              onClick={() => handleEdit(item)}
              aria-label={`Edit ${isDevice ? 'device' : 'room'}`}
            >
              <FaEdit />
            </button>
            <button
              className="action-button delete"
              onClick={() => handleDelete(item)}
              aria-label={`Delete ${isDevice ? 'device' : 'room'}`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="card-content">
          <p>{item.description}</p>
          <div className="card-details">
            {isDevice ? (
              <>
                <span className="detail-item">Type: {item.type}</span>
                <span className={`status-badge ${item.status}`}>{item.status}</span>
              </>
            ) : (
              <>
                <span className="detail-item">Devices: {item.deviceCount}</span>
                <span className={`status-badge ${item.status}`}>{item.status}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderModal = () => {
    const modalType = showAddModal ? 'Add' : showEditModal ? 'Edit' : 'Delete';
    const isDeleteModal = modalType === 'Delete';

    return (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className="modal-header">
            <h2>{modalType} {formData.type === 'room' ? 'Room' : 'Device'}</h2>
            <button
              className="close-button"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setShowDeleteModal(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          
          {isDeleteModal ? (
            <div className="modal-content">
              <p>Are you sure you want to delete this {selectedItem?.deviceType ? 'device' : 'room'}?</p>
              <p>This action cannot be undone.</p>
              <div className="modal-actions">
                <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="delete-button" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="room">Room</option>
                  <option value="device">Device</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {formData.type === 'device' && (
                <>
                  <div className="form-group">
                    <label>Device Type</label>
                    <select
                      value={formData.deviceType}
                      onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="lighting">Lighting</option>
                      <option value="climate">Climate Control</option>
                      <option value="security">Security</option>
                      <option value="entertainment">Entertainment</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Assign to Room</label>
                    <select
                      value={formData.roomId}
                      onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                      required
                    >
                      <option value="">Select Room</option>
                      {rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  {formData.type === 'device' && (
                    <>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </>
                  )}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {modalType}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="admin-management">
      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="sidebar-header">
          <Link to="/admin" className="brand-link">
            <FaHome /> Harbli's Home
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="sidebar-toggle">
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item">
            <FaHome /> <span>Dashboard</span>
          </Link>
          <Link to="/admin/user-management" className="nav-item">
            <FaUsers /> <span>User Management</span>
          </Link>
          <Link to="/admin/room-device-management" className="nav-item active">
            <FaCog /> <span>Rooms & Devices</span>
          </Link>
          <Link to="/admin/analytics" className="nav-item">
            <FaChartLine /> <span>Analytics</span>
          </Link>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="content-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <FaBars />
            </button>
            <h1>Room & Device Management</h1>
          </div>
          <div className="header-actions">
            <button className="notification-button">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <button className="action-button" onClick={() => {}}>
              <FaCog />
            </button>
            <button className="action-button">
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="content-controls">
          <div className="search-filter">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search rooms and devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-controls">
              <FaFilter />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Items</option>
                <option value="rooms">Rooms Only</option>
                <option value="devices">Devices Only</option>
              </select>
            </div>
          </div>
          <button className="add-button" onClick={handleAdd}>
            <FaPlus /> Add New
          </button>
        </div>

        <div className="content-grid">
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            filteredItems().map(item => renderCard(item))
          )}
        </div>

        <AnimatePresence>
          {(showAddModal || showEditModal || showDeleteModal) && renderModal()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminRoomDeviceManagement; 