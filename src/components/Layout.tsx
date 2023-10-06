import { Outlet, Navigate } from "react-router-dom"
import NavBar from "./AppBar"
import { Box } from "@mui/material"
import SideNav from "./SideNav"
import Toolbar from '@mui/material/Toolbar';
import useUser from "../hooks/useUser";
import { useEffect } from "react";


function Layout() {
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
