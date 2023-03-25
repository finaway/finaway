import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { getRouteByName } from 'app/helpers/routesRegistered';
import { ControlledInputText } from 'app/components/Inputs';

export type FormValues = {
  email: string;
  password: string;
};

type FormProps = {
  loading: boolean;
  errors: {
    message?: string;
  };
  onSubmit: SubmitHandler<FormValues>;
};

export function Form({ loading, errors, onSubmit }: FormProps) {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { email: 'admin@example.test', password: 'admin' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.message && (
        <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
          {errors.message}
        </Alert>
      )}

      <ControlledInputText
        name="email"
        label="Email Address"
        control={control}
        disabled={loading}
        autoFocus
      />

      <ControlledInputText
        name="password"
        label="Password"
        type="password"
        control={control}
        disabled={loading}
        autoFocus
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
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to={getRouteByName('signup')}
            variant="body2"
          >
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
