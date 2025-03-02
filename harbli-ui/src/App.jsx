// App.jsx 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import AdminDashboard from './pages/admin/AdminDashboard'
// import AdminRoomDeviceManagement from './pages/admin/AdminRoomDeviceManagement'
import AdminUserManagement from './pages/admin/AdminUserManagement'
import UserDashboard from './pages/user/UserDashboard'
import UserRoomDeviceManagement from './pages/user/UserRoomDeviceManagement'
import UserSettings from './pages/user/UserSettings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* <Route path="/admin/room-device-management" element={<AdminRoomDeviceManagement />} /> */}
        <Route path="/admin/user-management" element={<AdminUserManagement />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/user/room-device-management" element={<UserRoomDeviceManagement />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
