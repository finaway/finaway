export interface Route {
  name: string;
  path: string;
  component: React.ComponentType;
}

export const routesRegistered: Route[] = [];

export const registerRoute = (route: Route) => {
  routesRegistered.push(route);

  return route;
};

export const getRouteByName = (name: string) => {
  const routeRegistered = routesRegistered.find(route => route.name === name);

  if (!routeRegistered) {
    throw new Error(`Route with name ${name} not found`);
  }

  return routeRegistered.path;
};
