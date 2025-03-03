// UserRoomDeviceManagement.jsx 

import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { MdRoom, MdDevices } from 'react-icons/md';
import '../../styles/UserRoomDeviceManagement.css';

const UserRoomDeviceManagement = () => {
  const [items, setItems] = useState({ rooms: [], devices: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [modalItemType, setModalItemType] = useState('room'); // 'room' or 'device'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'active',
    description: ''
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    setItems({
      rooms: [
        { id: 1, name: 'Living Room', type: 'room', status: 'active', description: 'Main living area' },
        { id: 2, name: 'Kitchen', type: 'room', status: 'active', description: 'Cooking space' }
      ],
      devices: [
        { id: 1, name: 'Smart Light', type: 'device', status: 'active', description: 'Phillips Hue', roomId: 1 },
        { id: 2, name: 'Thermostat', type: 'device', status: 'active', description: 'Nest', roomId: 1 }
      ]
    });
  }, []);

  const handleOpenModal = (type, itemType, item = null) => {
    setModalType(type);
    setModalItemType(itemType);
    setSelectedItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData({ name: '', type: itemType, status: 'active', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setFormData({ name: '', type: '', status: 'active', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call here
    if (modalType === 'add') {
      const newItem = {
        ...formData,
        id: Math.random(), // Replace with actual ID from backend
      };
      setItems(prev => ({
        ...prev,
        [modalItemType + 's']: [...prev[modalItemType + 's'], newItem]
      }));
    } else {
      setItems(prev => ({
        ...prev,
        [modalItemType + 's']: prev[modalItemType + 's'].map(item =>
          item.id === selectedItem.id ? { ...item, ...formData } : item
        )
      }));
    }
    handleCloseModal();
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Add API call here
    setItems(prev => ({
      ...prev,
      [itemToDelete.type + 's']: prev[itemToDelete.type + 's'].filter(item => item.id !== itemToDelete.id)
    }));
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="user-room-device-management">
      <header className="user-room-device-management-header">
        <div className="user-room-device-management-header-content">
          <h1>Manage Rooms & Devices</h1>
          <nav className="user-room-device-management-breadcrumb">
            <span>Home</span> / <span>Management</span>
          </nav>
        </div>
        <div className="user-room-device-management-header-actions">
          <button 
            className="user-room-device-management-add-button"
            onClick={() => handleOpenModal('add', 'room')}
          >
            <FaPlus /> Add Room
          </button>
          <button 
            className="user-room-device-management-add-button"
            onClick={() => handleOpenModal('add', 'device')}
          >
            <FaPlus /> Add Device
          </button>
        </div>
      </header>

      <main className="user-room-device-management-content">
        <section className="user-room-device-management-rooms-section">
          <h2>Rooms</h2>
          <div className="user-room-device-management-items-grid">
            {items.rooms.map(room => (
              <article key={room.id} className="user-room-device-management-item-card">
                <div className="user-room-device-management-card-header">
                  <MdRoom className="user-room-device-management-card-icon" />
                  <h3>{room.name}</h3>
                </div>
                <div className="user-room-device-management-card-content">
                  <p>{room.description}</p>
                  <span className={`user-room-device-management-status-badge ${room.status}`}>{room.status}</span>
                </div>
                <div className="user-room-device-management-card-actions">
                  <button 
                    className="user-room-device-management-edit-button"
                    onClick={() => handleOpenModal('edit', 'room', room)}
                    title="Edit Room"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="user-room-device-management-delete-button"
                    onClick={() => handleDelete(room)}
                    title="Delete Room"
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="user-room-device-management-devices-section">
          <h2>Devices</h2>
          <div className="user-room-device-management-items-grid">
            {items.devices.map(device => (
              <article key={device.id} className="user-room-device-management-item-card">
                <div className="user-room-device-management-card-header">
                  <MdDevices className="user-room-device-management-card-icon" />
                  <h3>{device.name}</h3>
                </div>
                <div className="user-room-device-management-card-content">
                  <p>{device.description}</p>
                  <span className={`user-room-device-management-status-badge ${device.status}`}>{device.status}</span>
                </div>
                <div className="user-room-device-management-card-actions">
                  <button 
                    className="user-room-device-management-edit-button"
                    onClick={() => handleOpenModal('edit', 'device', device)}
                    title="Edit Device"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="user-room-device-management-delete-button"
                    onClick={() => handleDelete(device)}
                    title="Delete Device"
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="user-room-device-management-modal-overlay">
          <div className="user-room-device-management-modal">
            <div className="user-room-device-management-modal-header">
              <h2>{modalType === 'add' ? `Add New ${modalItemType}` : `Edit ${modalItemType}`}</h2>
              <button className="user-room-device-management-close-button" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="user-room-device-management-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="user-room-device-management-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="user-room-device-management-form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="user-room-device-management-modal-actions">
                <button type="button" className="user-room-device-management-cancel-button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="user-room-device-management-submit-button">
                  {modalType === 'add' ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="user-room-device-management-modal-overlay">
          <div className="user-room-device-management-modal">
            <div className="user-room-device-management-modal-header">
              <h2>Confirm Delete</h2>
              <button className="user-room-device-management-close-button" onClick={() => setIsDeleteDialogOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="user-room-device-management-modal-content">
              <p>Are you sure you want to delete this {itemToDelete?.type}?</p>
              <div className="user-room-device-management-modal-actions">
                <button 
                  className="user-room-device-management-cancel-button"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="user-room-device-management-delete-button"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoomDeviceManagement; 
