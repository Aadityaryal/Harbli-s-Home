const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const AuthController = {
    register: async (req, res) => {
      try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already registered' });
        }

        const user = await User.create({
          email,
          password,
          name
        });

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        });
      } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
      }
    },
    login: async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        await user.update({ lastLogin: new Date() });

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        });
      } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
      }
    },
    forgotPassword: async (req, res) => {
      try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // In a real application, send this token via email
        // For now, we'll just return it
        res.json({
          message: 'Password reset token generated',
          resetToken
        });
      } catch (error) {
        res.status(500).json({ message: 'Error processing request', error: error.message });
      }
    },
    resetPassword: async (req, res) => {
      try {
        const { token, newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ password: newPassword });

        res.json({ message: 'Password reset successful' });
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ message: 'Error resetting password', error: error.message });
      }
    }
  };

  module.exports = AuthController;