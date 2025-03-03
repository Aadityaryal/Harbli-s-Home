'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create admin user
    const adminId = uuidv4();
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await queryInterface.bulkInsert('Users', [{
      id: adminId,
      email: 'admin@harbli.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
      preferences: JSON.stringify({
        theme: 'dark',
        notifications: true,
        language: 'en'
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // Create demo user
    const userId = uuidv4();
    const userPassword = await bcrypt.hash('user123', 10);
    
    await queryInterface.bulkInsert('Users', [{
      id: userId,
      email: 'user@harbli.com',
      password: userPassword,
      name: 'Demo User',
      role: 'user',
      isActive: true,
      preferences: JSON.stringify({
        theme: 'light',
        notifications: true,
        language: 'en'
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // Create demo rooms
    const livingRoomId = uuidv4();
    const bedroomId = uuidv4();

    await queryInterface.bulkInsert('Rooms', [
      {
        id: livingRoomId,
        name: 'Living Room',
        description: 'Main living area',
        type: 'living',
        userId: userId,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: bedroomId,
        name: 'Master Bedroom',
        description: 'Master bedroom with ensuite',
        type: 'bedroom',
        userId: userId,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Create demo devices
    await queryInterface.bulkInsert('Devices', [
      {
        id: uuidv4(),
        name: 'Main Light',
        type: 'lighting',
        status: 'online',
        description: 'Main ceiling light',
        settings: JSON.stringify({
          brightness: 80,
          color: 'warm'
        }),
        roomId: livingRoomId,
        isActive: true,
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'AC Unit',
        type: 'climate',
        status: 'online',
        description: 'Air conditioning unit',
        settings: JSON.stringify({
          temperature: 22,
          mode: 'auto'
        }),
        roomId: livingRoomId,
        isActive: true,
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Bedroom Light',
        type: 'lighting',
        status: 'offline',
        description: 'Bedroom ceiling light',
        settings: JSON.stringify({
          brightness: 60,
          color: 'cool'
        }),
        roomId: bedroomId,
        isActive: true,
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Devices', null, {});
    await queryInterface.bulkDelete('Rooms', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
}; 