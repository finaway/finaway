import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';

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
  const { handleSubmit, control } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.message && (
        <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
          {errors.message}
        </Alert>
      )}

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
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
