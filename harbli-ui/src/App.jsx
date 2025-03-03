// App.jsx 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import AdminLayout from './components/layout/AdminLayout'
import AdminRoomDeviceManagement from './pages/admin/AdminRoomDeviceManagement'
import AdminUserManagement from './pages/admin/AdminUserManagement'
import UserDashboard from './pages/user/UserDashboard'
import UserRoomDeviceManagement from './pages/user/UserRoomDeviceManagement'
import UserSettings from './pages/user/UserSettings'
import UserLayout from './components/layout/UserLayout'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/user-management" replace />} />
          <Route path="/admin/user-management" element={<AdminUserManagement />} />
          <Route path="/admin/room-device-management" element={<AdminRoomDeviceManagement />} />
        </Route>
        <Route element={
          <UserProvider>
            <UserLayout />
          </UserProvider>
        }>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/room-device-management" element={<UserRoomDeviceManagement />} />
          <Route path="/settings" element={<UserSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
