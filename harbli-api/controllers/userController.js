const { User, Room, Device } = require('../models');

const UserController = {
  // Get current user profile with rooms and devices
  getProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{
          model: Room,
          as: 'rooms',
          include: [{
            model: Device,
            as: 'devices'
          }]
        }]
      });

      const stats = await user.getDashboardStats();
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          profilePicture: user.profilePicture,
          preferences: user.preferences
        },
        stats
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const { name, preferences, profilePicture } = req.body;
      const user = await User.findByPk(req.user.id);

      await user.update({
        name: name || user.name,
        preferences: preferences || user.preferences,
        profilePicture: profilePicture || user.profilePicture
      });

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
          preferences: user.preferences
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
  },

  // Admin: Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'name', 'role', 'isActive', 'lastLogin'],
        include: [{
          model: Room,
          as: 'rooms',
          attributes: ['id', 'name'],
          include: [{
            model: Device,
            as: 'devices',
            attributes: ['id', 'name', 'type', 'status']
          }]
        }]
      });

      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  },

  // Admin: Update user
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, role, isActive } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update({
        name: name || user.name,
        role: role || user.role,
        isActive: isActive !== undefined ? isActive : user.isActive
      });

      res.json({
        message: 'User updated successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  },

  // Admin: Delete user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  }
};

module.exports = UserController; 