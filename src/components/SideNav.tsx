import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const links = [
    {label: 'Dashboard', link: '/'},
    {label: 'Users', link: '/users'},
    {label: 'Roles', link: '/roles'},
    {label: 'Products', link: '/products'},
]

export default function SideNav() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                height: 32,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {links.map((link) => (
                        <ListItem key={link.label} disablePadding>
                            <ListItemButton>
                                <Link to={link.link}><ListItemText primary={link.label} /></Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}