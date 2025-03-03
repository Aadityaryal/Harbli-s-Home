const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Device = sequelize.define('Device', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('lighting', 'climate', 'security', 'power'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('online', 'offline'),
      defaultValue: 'offline'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {},
      get() {
        const rawValue = this.getDataValue('settings');
        return rawValue ? JSON.parse(JSON.stringify(rawValue)) : {};
      }
    },
    lastActivity: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    }
  }, {
    hooks: {
      beforeUpdate: async (device) => {
        device.lastActivity = new Date();
      }
    }
  });

  Device.associate = (models) => {
    Device.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'room',
      onDelete: 'CASCADE'
    });
  };

  return Device;
};