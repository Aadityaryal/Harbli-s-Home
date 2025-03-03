const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deviceCount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.devices ? this.devices.length : 0;
      }
    },
    activeDeviceCount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.devices ? this.devices.filter(d => d.status === 'online').length : 0;
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

  Room.associate = (models) => {
    Room.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
    Room.hasMany(models.Device, {
      foreignKey: 'roomId',
      as: 'devices'
    });
  };

  // Instance method to get room statistics
  Room.prototype.getStatistics = async function() {
    const devices = await this.getDevices();
    const deviceTypes = devices.reduce((acc, device) => {
      acc[device.type] = (acc[device.type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalDevices: devices.length,
      onlineDevices: devices.filter(d => d.status === 'online').length,
      offlineDevices: devices.filter(d => d.status === 'offline').length,
      deviceTypes
    };
  };

  return Room;
};