import { ExpensePage } from './pages/ExpensePage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';

interface Route {
  path: string;
  name: string;
  component: React.ComponentType;
}

export const guestRoutes: Route[] = [
  { path: '/login', name: 'login', component: LoginPage },
];

export const authRoutes: Route[] = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/expense', name: 'expense', component: ExpensePage },
];
