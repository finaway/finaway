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

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/LoginPage/Loadable';
import { AuthRoute, GuestRoute } from './components/Route';
import { useAuthSlice } from './global-stores/auth';
import { slices } from 'store/bootstrapSlices';

export function App() {
  const { i18n } = useTranslation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  slices.forEach(() => useAuthSlice());

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route path="/" element={<AuthRoute component={HomePage} />} />
        <Route path="/login" element={<GuestRoute component={LoginPage} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
