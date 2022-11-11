import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
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
        <title>LoginPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Form loading={loading} errors={errors} onSubmit={handleSubmit} />
    </>
  );
}
