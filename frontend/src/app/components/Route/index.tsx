import { selectAuth } from 'app/global-stores/auth/selectors';
import { getRouteByName } from 'app/helpers/routesRegistered';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface Props {
  component: React.ComponentType;
}

export const GuestRoute = memo(({ component: Component }: Props) => {
  const { user } = useSelector(selectAuth);

  if (user?.id) {
    return <Navigate to={getRouteByName('home')} replace />;
  }

  return <Component />;
});

export const AuthRoute = memo(({ component: Component }: Props) => {
  const { user } = useSelector(selectAuth);

  if (user?.id) {
    return <Component />;
  }

  return <Navigate to={getRouteByName('login')} replace />;
});
