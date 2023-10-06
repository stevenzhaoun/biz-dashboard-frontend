
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import ListUsers from './modules/Users/ListUsers'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './modules/Login'
import Roles from './modules/Roles'
import UserDetail from './modules/Users/UserDetail'
function App() {


  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/roles' element={<Roles />} />
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
