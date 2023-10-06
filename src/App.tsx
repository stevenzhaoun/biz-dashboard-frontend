
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Users from './modules/Users'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './modules/Login'
import useUser from './hooks/useUser'
import { useEffect } from 'react'
import Roles from './modules/Roles'
function App() {
  const { user, setUserData } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      if (!user) {
        const userData = JSON.parse(userStr)
        setUserData(userData)
      }
    } else {
      if(!user) {
        navigate('/login')
      }
    }
  }, [user])

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/roles' element={<Roles />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
