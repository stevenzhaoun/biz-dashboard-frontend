
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import ListUsers from './modules/Users/ListUsers'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './modules/Login'
import ListRoles from './modules/Roles/ListRoles'
import UserDetail from './modules/Users/UserDetail'
import RoleDetail from './modules/Roles/RoleDetails'
function App() {


  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/roles'>
            <Route index element={<ListRoles />} />
            <Route path=":id" element={<RoleDetail />} />
          </Route>
          <Route path='/users'>
            <Route index element={<ListUsers />} />
            <Route path=":id" element={<UserDetail />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
