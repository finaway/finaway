import { DashboardLayout } from 'app/components/Layouts/DashboardLayout/Loadable';
import { getRouteByName } from 'app/helpers/routesRegistered';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <DashboardLayout title="Home">
        <span>My HomePage</span>
        <Link to={getRouteByName('expenses.index')}>Expense</Link>
      </DashboardLayout>
    </>
  );
}
