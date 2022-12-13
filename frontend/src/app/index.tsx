/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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

export function App() {
  const { i18n } = useTranslation();

  slices.forEach(slice => slice());

  return (
    <BrowserRouter>
      <ReduxRouterConnector>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
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
              element={<AuthRoute component={route.component} />}
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ReduxRouterConnector>

      <GlobalStyle />
    </BrowserRouter>
  );
}
