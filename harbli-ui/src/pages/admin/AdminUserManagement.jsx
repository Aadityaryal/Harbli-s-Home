// AdminUserManagement.jsx 

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaUsers, FaEdit, FaTrash, FaCheck, FaBan,
  FaSearch, FaFilter, FaCog, FaBell, FaUser, FaSignOutAlt, FaSort
} from 'react-icons/fa';
import '../../styles/AdminUserManagement.css';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastLogin: '2024-03-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastLogin: '2024-03-02' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', lastLogin: '2024-02-28' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'manager', status: 'active', lastLogin: '2024-03-01' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'user', status: 'pending', lastLogin: '2024-02-25' }
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = users;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleStatusToggle = (userId) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Add API call here
    setUsers(prev => prev.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          ...editFormData
        };
      }
      return user;
    }));
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Add API call here
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'status-badge-success';
      case 'inactive': return 'status-badge-danger';
      case 'pending': return 'status-badge-warning';
      default: return 'status-badge-default';
    }
  };

  return (
    <div className="admin-user-management">
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="nav-brand">
          <Link to="/admin">Harbli's Home</Link>
          <h1>User Management</h1>
        </div>
        <div className="nav-actions">
          <button className="nav-button" title="Notifications">
            <FaBell />
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

      {/* Main Content */}
      <main className="main-content">
        {/* Filters and Search */}
        <section className="filters-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </section>

        {/* User Table */}
        <section className="table-section">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>
                    Name <FaSort className="sort-icon" />
                  </th>
                  <th onClick={() => handleSort('email')}>
                    Email <FaSort className="sort-icon" />
                  </th>
                  <th onClick={() => handleSort('role')}>
                    Role <FaSort className="sort-icon" />
                  </th>
                  <th onClick={() => handleSort('status')}>
                    Status <FaSort className="sort-icon" />
                  </th>
                  <th onClick={() => handleSort('lastLogin')}>
                    Last Login <FaSort className="sort-icon" />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="role-cell">{user.role}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td className="actions-cell">
                      <button
                        className="action-button edit"
                        onClick={() => handleEditClick(user)}
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-button toggle-status"
                        onClick={() => handleStatusToggle(user.id)}
                        title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                      >
                        {user.status === 'active' ? <FaBan /> : <FaCheck />}
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => handleDeleteClick(user)}
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Edit User</h2>
                <button className="close-button" onClick={() => setIsEditModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    value={editFormData.role}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, role: e.target.value }))}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={editFormData.status}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-button" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay">
            <div className="modal delete-modal">
              <div className="modal-header">
                <h2>Confirm Delete</h2>
                <button className="close-button" onClick={() => setIsDeleteModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-content">
                <p>Are you sure you want to delete the user <strong>{selectedUser?.name}</strong>?</p>
                <p>This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button className="cancel-button" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </button>
                <button className="delete-button" onClick={handleDeleteConfirm}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUserManagement; 