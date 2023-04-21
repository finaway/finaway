import { lazyLoad } from 'utils/loadable';

export const EditPasswordPage = lazyLoad(
  () => import('./index'),
  module => module.EditPasswordPage,
);
