import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form, FormValues } from './Form';
import { useLoginPageSlice } from './slice';
import { selectLoginPage } from './slice/selectors';

export function LoginPage() {
  const dispatch = useDispatch();

  const { actions } = useLoginPageSlice();
  const { loading, errors } = useSelector(selectLoginPage);

  const handleSubmit = (values: FormValues) => {
    dispatch(actions.login(values));
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login first to start your session" />
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
            <Form loading={loading} errors={errors} onSubmit={handleSubmit} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
