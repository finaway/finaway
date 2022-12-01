import { registerRoute, Route } from './helpers/routesRegistered';
import { ExpenseCreate, ExpensePage } from './pages/ExpensePage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';

export const guestRoutes: Route[] = [
  registerRoute({ path: '/login', name: 'login', component: LoginPage }),
];

export const authRoutes: Route[] = [
  registerRoute({ path: '/', name: 'home', component: HomePage }),
  registerRoute({
    path: '/expenses',
    name: 'expenses.index',
    component: ExpensePage,
  }),
  registerRoute({
    path: '/expenses/create',
    name: 'expenses.create',
    component: ExpenseCreate,
  }),
];
