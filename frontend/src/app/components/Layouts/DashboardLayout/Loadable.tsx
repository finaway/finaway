import { lazyLoad } from 'utils/loadable';

export const DashboardLayout = lazyLoad(
  () => import('./index'),
  module => module.DashboardLayout,
);
