import { ContentWrapper } from 'app/components/ContentWrapper';
import { selectAuth } from 'app/global-stores/auth/selectors';
import { useAppBarTitle } from 'app/hooks/useAppBarTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { red } from '@mui/material/colors';
import { useAuthSlice } from 'app/global-stores/auth';

export function ProfilePage() {
  useAppBarTitle('Profile');

  const dispatch = useDispatch();

  const { user } = useSelector(selectAuth);
  const { actions } = useAuthSlice();

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <ContentWrapper>
      <Paper
        sx={{
          paddingX: 3,
          paddingY: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ width: 75, height: 75 }} />

        <Typography
          sx={{
            marginTop: 1,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {user!.name}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: 'text.secondary',
          }}
        >
          {user!.email}
        </Typography>
      </Paper>

      <Paper sx={{ marginTop: 2 }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit Profil</ListItemText>
            <Typography variant="body2" color="text.secondary">
              <KeyboardArrowRightIcon fontSize="small" />
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <EmailIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Email</ListItemText>
            <Typography variant="body2" color="text.secondary">
              <KeyboardArrowRightIcon fontSize="small" />
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <KeyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Password</ListItemText>
            <Typography variant="body2" color="text.secondary">
              <KeyboardArrowRightIcon fontSize="small" />
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: red[500] }}>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </ContentWrapper>
  );
}
