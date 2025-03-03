const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const validate = require('../middleware/validationMiddleware');

const updateProfileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('preferences').optional().isObject().withMessage('Preferences must be an object'),
  body('profilePicture').optional().isURL().withMessage('Profile picture must be a valid URL')
];

const updateUserValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];

// User routes
router.get('/me', authMiddleware, UserController.getProfile);
router.put('/me', authMiddleware, validate(updateProfileValidation), UserController.updateProfile);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, UserController.getAllUsers);
router.put('/:id', authMiddleware, adminMiddleware, validate(updateUserValidation), UserController.updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, UserController.deleteUser);

module.exports = router; 