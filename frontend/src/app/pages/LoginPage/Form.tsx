import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: 'test@test.com', password: 'password' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.message && <div>{errors.message}</div>}

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Loading ...' : 'Login'}
      </button>
    </form>
  );
}
