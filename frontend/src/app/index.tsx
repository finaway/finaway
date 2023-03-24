/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { AuthRoute, GuestRoute } from './components/Route';
import { slices } from 'store/bootstrapSlices';
import { authRoutes, guestRoutes } from './routes';
import { ReduxRouterConnector } from './components/ReduxRouterConnector';
import { DashboardLayout } from './components/Layouts/DashboardLayout/Loadable';

export function App() {
  const { i18n } = useTranslation();

  slices.forEach(slice => slice());

  return (
    <BrowserRouter>
      <ReduxRouterConnector>
        <Helmet
          titleTemplate="%s | Finaway"
          defaultTitle="Finaway"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta
            name="description"
            content="Financial expense management application"
          />
        </Helmet>

        <Routes>
          {guestRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<GuestRoute component={route.component} />}
            />
          ))}

          {authRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <DashboardLayout>
                  <AuthRoute component={route.component} />
                </DashboardLayout>
              }
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ReduxRouterConnector>

      <GlobalStyle />
    </BrowserRouter>
  );
}
