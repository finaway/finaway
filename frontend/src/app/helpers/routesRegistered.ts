export const ROUTE_NAMES = {
  home: 'home',
  login: 'login',
  signUp: 'sign-up',
  forgotPassword: 'forgot-password',
  expensesIndex: 'expenses-index',
  profile: 'profile',
} as const;

type RouteName = keyof typeof ROUTE_NAMES;

export interface Route {
  name: RouteName;
  path: string;
  component: React.ComponentType;
}

export const routesRegistered: Map<RouteName, Route> = new Map();

export const registerRoute = (route: Route) => {
  routesRegistered.set(route.name, route);
  return route;
};

export const getRouteByName = (name: RouteName) => {
  const routeRegistered = routesRegistered.get(name);

  if (!routeRegistered) {
    throw new Error(`Route with name ${name} not found`);
  }

  return routeRegistered.path;
};
