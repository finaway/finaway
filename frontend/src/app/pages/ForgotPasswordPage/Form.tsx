import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface FormValues {
  email: string;
}

interface ForgotPasswordPageProps {
  loading: boolean;
  errors: {
    email?: string;
  };
  onSubmit: SubmitHandler<FormValues>;
}

export function ForgotPasswordPage({ onSubmit }: ForgotPasswordPageProps) {
  const { handleSubmit } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Welcome to Forgot Password Page!</h1>
    </form>
  );
}
