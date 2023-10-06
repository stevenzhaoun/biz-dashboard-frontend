import { Outlet } from "react-router-dom"
import NavBar from "./AppBar"
import { Box, CircularProgress } from "@mui/material"
import SideNav from "./SideNav"
import Toolbar from '@mui/material/Toolbar';
import useInitialLoading from "../hooks/useInitialLoading";

function Layout() {
  const { loading } = useInitialLoading()
  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      <header><NavBar /></header>
      <Box sx={{ display: 'flex' }} >
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default Layout
