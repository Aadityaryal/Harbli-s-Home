const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const RoomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');

const roomValidation = [
  body('name').trim().notEmpty().withMessage('Room name is required'),
  body('description').optional().trim(),
  body('type').optional().trim().notEmpty().withMessage('Room type cannot be empty'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];

// Room routes (all require authentication)
router.use(authMiddleware);

router.get('/', RoomController.getUserRooms);
router.post('/', validate(roomValidation), RoomController.createRoom);
router.get('/:id', RoomController.getRoom);
router.put('/:id', validate(roomValidation), RoomController.updateRoom);
router.delete('/:id', RoomController.deleteRoom);

module.exports = router; 