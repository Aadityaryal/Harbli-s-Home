// App.jsx 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Auth from './pages/Auth'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import AdminRoomDeviceManagement from './pages/admin/AdminRoomDeviceManagement'
// import AdminUserManagement from './pages/admin/AdminUserManagement'
// import UserDashboard from './pages/user/UserDashboard'
// import UserRoomDeviceManagement from './pages/user/UserRoomDeviceManagement'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* <Route path="/admin/room-device-management" element={<AdminRoomDeviceManagement />} /> */}
        {/* <Route path="/admin/user-management" element={<AdminUserManagement />} /> */}
        {/* <Route path="/user" element={<UserDashboard />} /> */}
        {/* <Route path="/user/room-device-management" element={<UserRoomDeviceManagement />} /> */}
      </Routes>
    </Router>
  )
}

export default App;
