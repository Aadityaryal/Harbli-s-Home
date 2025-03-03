const { Room, Device } = require('../models');

const RoomController = {
  // Get all rooms for current user
  getUserRooms: async (req, res) => {
    try {
      const rooms = await Room.findAll({
        where: { userId: req.user.id },
        include: [{
          model: Device,
          as: 'devices',
          attributes: ['id', 'name', 'type', 'status', 'settings', 'lastActivity']
        }],
        order: [['createdAt', 'DESC']]
      });

      const roomsWithStats = await Promise.all(
        rooms.map(async (room) => {
          const stats = await room.getStatistics();
          return {
            ...room.toJSON(),
            stats
          };
        })
      );

      res.json(roomsWithStats);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rooms', error: error.message });
    }
  },

  // Create new room
  createRoom: async (req, res) => {
    try {
      const { name, description, type } = req.body;
      
      const room = await Room.create({
        name,
        description,
        type,
        userId: req.user.id
      });

      res.status(201).json({
        message: 'Room created successfully',
        room: {
          id: room.id,
          name: room.name,
          description: room.description,
          type: room.type,
          deviceCount: 0,
          activeDeviceCount: 0
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating room', error: error.message });
    }
  },

  // Get single room with devices
  getRoom: async (req, res) => {
    try {
      const room = await Room.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        },
        include: [{
          model: Device,
          as: 'devices',
          attributes: ['id', 'name', 'type', 'status', 'settings', 'lastActivity', 'description']
        }]
      });

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      const stats = await room.getStatistics();

      res.json({
        ...room.toJSON(),
        stats
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching room', error: error.message });
    }
  },

  // Update room
  updateRoom: async (req, res) => {
    try {
      const { name, description, type, isActive } = req.body;
      
      const room = await Room.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      });

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      await room.update({
        name: name || room.name,
        description: description || room.description,
        type: type || room.type,
        isActive: isActive !== undefined ? isActive : room.isActive
      });

      res.json({
        message: 'Room updated successfully',
        room: room.toJSON()
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating room', error: error.message });
    }
  },

  // Delete room
  deleteRoom: async (req, res) => {
    try {
      const room = await Room.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      });

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      await room.destroy();
      res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting room', error: error.message });
    }
  }
};

module.exports = RoomController; 