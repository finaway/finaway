import { useAuthSlice } from 'app/global-stores/auth';
import { getRouteByName } from 'app/helpers/routesRegistered';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <Link to={getRouteByName('expenses.index')}>Expense</Link>

      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}
