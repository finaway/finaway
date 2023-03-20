import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form, FormValues } from './Form';
import { useSignUpPageSlice } from './slice';
import { selectSignUpPage } from './slice/selectors';

export function SignUpPage() {
  const dispatch = useDispatch();

  const { actions } = useSignUpPageSlice();
  const { loading, errors } = useSelector(selectSignUpPage);

  const handleSubmit = (values: FormValues) => {
    dispatch(actions.signup(values));
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Sign up first to start your session"
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
            <Form loading={loading} errors={errors} onSubmit={handleSubmit} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
