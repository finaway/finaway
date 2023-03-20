import React, { useState } from 'react';
import { NavBar } from './NavBar';
import Container from '@mui/material/Container';
import { SideBar } from './SideBar';
import { useDispatch } from 'react-redux';
import { useAuthSlice } from 'app/global-stores/auth';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function DashboardLayout({ title, children }: Props) {
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <NavBar
        title={title}
        onDrawerOpen={handleDrawerOpen}
        onLogout={handleLogout}
      />
      <SideBar
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onLogout={handleLogout}
      />
      <Container
        maxWidth="sm"
        sx={{
          marginTop: '64px',
          marginBottom: '64px',
        }}
      >
        {children}
      </Container>
    </>
  );
}
