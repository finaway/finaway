import React from 'react';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';

import { red } from '@mui/material/colors';
import { getRouteByName } from 'app/helpers/routesRegistered';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const menus = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    path: getRouteByName('home'),
  },
  {
    text: 'Expense',
    icon: <AttachMoneyIcon />,
    path: getRouteByName('expensesIndex'),
  },
];

export function SideBar({ isOpen, onClose, onLogout }: Props) {
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {menus.map(menu => (
          <ListItem key={menu.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(menu.path);
                onClose();
              }}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={onLogout}
            sx={{
              color: red[500],
            }}
          >
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
