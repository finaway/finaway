import { lazyLoad } from 'utils/loadable';

export const ExpensePage = lazyLoad(
  () => import('./index'),
  module => module.ExpensePage,
);

export const ExpenseCreate = lazyLoad(
  () => import('./ExpenseCreate'),
  module => module.ExpenseCreate,
);
