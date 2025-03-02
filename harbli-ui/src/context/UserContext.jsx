import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: null,
  });

  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Living Room',
      description: 'Main living area',
      devices: [
        { id: 1, name: 'Smart Light', type: 'lighting', status: 'online' },
        { id: 2, name: 'Thermostat', type: 'climate', status: 'online' },
      ],
    },
    {
      id: 2,
      name: 'Kitchen',
      description: 'Kitchen and dining area',
      devices: [
        { id: 3, name: 'Smart Plug', type: 'power', status: 'online' },
        { id: 4, name: 'Security Camera', type: 'security', status: 'offline' },
      ],
    },
  ]);

  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: false,
      deviceUpdates: true,
      weeklyReports: true,
    },
    theme: {
      darkMode: false,
    },
  });

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const updateRoom = (roomId, newData) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, ...newData } : room
    ));
  };

  const addRoom = (roomData) => {
    setRooms(prev => [...prev, { id: Date.now(), devices: [], ...roomData }]);
  };

  const deleteRoom = (roomId) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
  };

  const updateDevice = (roomId, deviceId, newData) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          devices: room.devices.map(device =>
            device.id === deviceId ? { ...device, ...newData } : device
          ),
        };
      }
      return room;
    }));
  };

  const addDevice = (roomId, deviceData) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          devices: [...room.devices, { id: Date.now(), ...deviceData }],
        };
      }
      return room;
    }));
  };

  const deleteDevice = (roomId, deviceId) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          devices: room.devices.filter(device => device.id !== deviceId),
        };
      }
      return room;
    }));
  };

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const value = {
    userData,
    rooms,
    preferences,
    updateUserData,
    updateRoom,
    addRoom,
    deleteRoom,
    updateDevice,
    addDevice,
    deleteDevice,
    updatePreferences,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 