import { registerRoute, Route } from './helpers/routesRegistered';
import { ExpensePage } from './pages/ExpensePage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { ProfilePage } from './pages/ProfilePage/Loadable';
import { SignUpPage } from './pages/SignUpPage/Loadable';

export const guestRoutes: Route[] = [
  registerRoute({
    path: '/login',
    name: 'login',
    component: LoginPage,
  }),
  registerRoute({
    path: '/signup',
    name: 'signUp',
    component: SignUpPage,
  }),
  registerRoute({
    path: '/forgot-password',
    name: 'forgotPassword',
    component: SignUpPage,
  }),
];

export const authRoutes: Route[] = [
  registerRoute({
    path: '/',
    name: 'home',
    component: HomePage,
  }),
  registerRoute({
    path: '/expenses',
    name: 'expensesIndex',
    component: ExpensePage,
  }),
  registerRoute({
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  }),
];
