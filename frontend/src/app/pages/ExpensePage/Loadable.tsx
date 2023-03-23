import { lazyLoad } from 'utils/loadable';

export const ExpensePage = lazyLoad(
  () => import('./index'),
  module => module.ExpensePage,
);
