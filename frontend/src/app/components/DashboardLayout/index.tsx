import React, { useState } from 'react';
import { NavBar } from './NavBar';
import { SideBar } from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthSlice } from 'app/global-stores/auth';
import { selectApp } from 'app/global-stores/app/selectors';

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  const dispatch = useDispatch();
  const { appBarTitle } = useSelector(selectApp);
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
        title={appBarTitle}
        onDrawerOpen={handleDrawerOpen}
        onLogout={handleLogout}
      />
      <SideBar
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onLogout={handleLogout}
      />

      <div
        style={{
          marginTop: '70px',
        }}
      >
        {children}
      </div>
    </>
  );
}
