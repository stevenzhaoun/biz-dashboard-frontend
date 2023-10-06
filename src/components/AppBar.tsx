import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import useUser from "../hooks/useUser";

export default function NavBar() {
    const { user, logout } = useUser()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Business Management System
                    </Typography>
                    <Box display="flex" alignItems={'center'}>
                        <Box mr={3}><Typography ><strong>{user?.name}</strong></Typography></Box>
                        <Button color="inherit" size="small" onClick={logout}><Typography>Logout</Typography></Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}