import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form } from './Form';
import { Link as RouterLink } from 'react-router-dom';
import { getRouteByName } from 'app/helpers/routesRegistered';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export function SignUpPage() {
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
            <Form />

            <Grid container>
              <Grid item>
                <Link
                  component={RouterLink}
                  to={getRouteByName('login')}
                  variant="body2"
                >
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
