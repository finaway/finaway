import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { getRouteByName } from 'app/helpers/routesRegistered';
import { SignUpPageState } from './slice/types';

export type FormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type FormProps = {
  loading: boolean;
  errors: SignUpPageState['errors'];
  onSubmit: SubmitHandler<FormValues>;
};

export function Form({ loading, errors, onSubmit }: FormProps) {
  const { handleSubmit, control } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            autoFocus
            disabled={loading}
            error={!!errors.name}
            helperText={errors.name}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            autoComplete="email"
            autoFocus
            disabled={loading}
            error={!!errors.email}
            helperText={errors.email}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            autoFocus
            disabled={loading}
            error={!!errors.password}
            helperText={errors.password}
          />
        )}
      />

      <Controller
        name="password_confirmation"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            margin="normal"
            required
            fullWidth
            id="password_confirmation"
            label="Password Confirmation"
            type="password"
            autoComplete="current-password"
            autoFocus
            disabled={loading}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation}
          />
        )}
      />

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        loading={loading}
      >
        Sign In
      </LoadingButton>

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
    </form>
  );
}
