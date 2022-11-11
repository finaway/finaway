import { useAuthSlice } from 'app/global-stores/auth';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

export function HomePage() {
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();

  const logout = () => dispatch(actions.logout());

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>

      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}
