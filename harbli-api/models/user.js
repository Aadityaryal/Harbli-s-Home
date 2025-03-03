const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: 'https://via.placeholder.com/150'
    },
    preferences: {
      type: DataTypes.JSONB,
      defaultValue: {
        theme: 'light',
        notifications: true,
        language: 'en'
      }
    },
    lastLogin: DataTypes.DATE,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    roomCount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.rooms ? this.rooms.length : 0;
      }
    },
    deviceCount: {
      type: DataTypes.VIRTUAL,
      async get() {
        if (!this.rooms) return 0;
        const devices = await Promise.all(
          this.rooms.map(room => room.getDevices())
        );
        return devices.flat().length;
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Room, {
      foreignKey: 'userId',
      as: 'rooms'
    });
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  // Instance method to get user dashboard statistics
  User.prototype.getDashboardStats = async function() {
    const rooms = await this.getRooms({
      include: ['devices']
    });

    const devices = rooms.reduce((acc, room) => [...acc, ...room.devices], []);
    const deviceTypes = devices.reduce((acc, device) => {
      acc[device.type] = (acc[device.type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRooms: rooms.length,
      totalDevices: devices.length,
      activeDevices: devices.filter(d => d.status === 'online').length,
      deviceTypes,
      rooms: rooms.map(room => ({
        id: room.id,
        name: room.name,
        deviceCount: room.devices.length,
        activeDevices: room.devices.filter(d => d.status === 'online').length
      }))
    };
  };

  return User;
};