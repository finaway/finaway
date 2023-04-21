import { ContentWrapper } from 'app/components/ContentWrapper';
import { useAppBarTitle } from 'app/hooks/useAppBarTitle';
import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Form, FormRef } from './Form';
import { useSelector } from 'react-redux';
import { selectEditPasswordPage } from './slice/selectors';

export function EditPasswordPage() {
  useAppBarTitle('Profile');

  const navigate = useNavigate();

  const { loadings } = useSelector(selectEditPasswordPage);

  const formRef = React.useRef<FormRef>(null);

  return (
    <ContentWrapper>
      <Helmet>
        <title>Edit Password</title>
      </Helmet>

      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="error"
            aria-label="menu"
            onClick={() => navigate('/profile')}
          >
            <CloseIcon />
          </IconButton>
          {loadings.updating ? (
            <CircularProgress size={25} />
          ) : (
            <IconButton
              size="large"
              edge="end"
              color="success"
              aria-label="menu"
              onClick={() => formRef.current?.submit()}
            >
              <CheckIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Form ref={formRef} />
    </ContentWrapper>
  );
}
