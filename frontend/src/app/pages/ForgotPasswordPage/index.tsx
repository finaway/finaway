import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForgotPasswordPageSlice } from './slice';
import { selectForgotPasswordPage } from './slice/selectors';
import { Helmet } from 'react-helmet-async';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export function ForgotPasswordPage() {
  // const dispatch = useDispatch();

  // const { actions } = useForgotPasswordPageSlice();
  // const { errors, loading } = useSelector(selectForgotPasswordPage);

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="Reset your password if you forgot it"
        />
      </Helmet>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            {/* <Form loading={loading} errors={errors} onSubmit={handleSubmit} /> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
