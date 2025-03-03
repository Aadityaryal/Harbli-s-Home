const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const DeviceController = require('../controllers/deviceController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');

const deviceValidation = [
  body('name').trim().notEmpty().withMessage('Device name is required'),
  body('type').isIn(['lighting', 'climate', 'security', 'power']).withMessage('Invalid device type'),
  body('description').optional().trim(),
  body('settings').optional().isObject().withMessage('Settings must be an object'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];

const statusValidation = [
  body('status').isIn(['online', 'offline']).withMessage('Invalid status'),
  body('settings').optional().isObject().withMessage('Settings must be an object')
];

// Device routes (all require authentication)
router.use(authMiddleware);

// Room-specific device routes
router.get('/rooms/:roomId/devices', DeviceController.getRoomDevices);
router.post('/rooms/:roomId/devices', validate(deviceValidation), DeviceController.createDevice);

// Individual device routes
router.get('/:id', DeviceController.getDevice);
router.put('/:id', validate(deviceValidation), DeviceController.updateDevice);
router.put('/:id/status', validate(statusValidation), DeviceController.updateDeviceStatus);
router.delete('/:id', DeviceController.deleteDevice);

module.exports = router; 