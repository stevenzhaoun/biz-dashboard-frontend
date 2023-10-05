import { Outlet } from "react-router-dom"
import NavBar from "./AppBar"
import { Box } from "@mui/material"
import SideNav from "./SideNav"
import Toolbar from '@mui/material/Toolbar';
import Login from "../modules/Login";


function Layout() {
  // return (
  //   <Login/>
  // )
  return (
    <>
      <header><NavBar /></header>
      <Box sx={{display: 'flex'}} >
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet/>
        </Box>
      </Box>
    </>
  )
}

export default Layout
