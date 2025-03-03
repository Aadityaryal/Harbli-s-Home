const { Device, Room } = require('../models');

const DeviceController = {
  // Get all devices in a room
  getRoomDevices: async (req, res) => {
    try {
      const { roomId } = req.params;
      
      const room = await Room.findOne({
        where: {
          id: roomId,
          userId: req.user.id
        }
      });

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      const devices = await Device.findAll({
        where: { roomId },
        order: [['createdAt', 'DESC']]
      });

      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching devices', error: error.message });
    }
  },

  // Create new device
  createDevice: async (req, res) => {
    try {
      const { roomId } = req.params;
      const { name, type, description, settings } = req.body;

      const room = await Room.findOne({
        where: {
          id: roomId,
          userId: req.user.id
        }
      });

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      const device = await Device.create({
        name,
        type,
        description,
        settings,
        roomId
      });

      res.status(201).json({
        message: 'Device created successfully',
        device
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating device', error: error.message });
    }
  },

  // Get single device
  getDevice: async (req, res) => {
    try {
      const { id } = req.params;
      
      const device = await Device.findOne({
        where: { id },
        include: [{
          model: Room,
          as: 'room',
          where: { userId: req.user.id },
          attributes: ['id', 'name']
        }]
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      res.json(device);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching device', error: error.message });
    }
  },

  // Update device
  updateDevice: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, settings, isActive } = req.body;

      const device = await Device.findOne({
        where: { id },
        include: [{
          model: Room,
          as: 'room',
          where: { userId: req.user.id }
        }]
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      await device.update({
        name: name || device.name,
        description: description || device.description,
        settings: settings || device.settings,
        isActive: isActive !== undefined ? isActive : device.isActive,
        lastActivity: new Date()
      });

      res.json({
        message: 'Device updated successfully',
        device: device.toJSON()
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating device', error: error.message });
    }
  },

  // Update device status
  updateDeviceStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, settings } = req.body;

      const device = await Device.findOne({
        where: { id },
        include: [{
          model: Room,
          as: 'room',
          where: { userId: req.user.id }
        }]
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      await device.update({
        status,
        settings: settings || device.settings,
        lastActivity: new Date()
      });

      res.json({
        message: 'Device status updated successfully',
        device: device.toJSON()
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating device status', error: error.message });
    }
  },

  // Delete device
  deleteDevice: async (req, res) => {
    try {
      const { id } = req.params;

      const device = await Device.findOne({
        where: { id },
        include: [{
          model: Room,
          as: 'room',
          where: { userId: req.user.id }
        }]
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      await device.destroy();
      res.json({ message: 'Device deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting device', error: error.message });
    }
  }
};

module.exports = DeviceController; 