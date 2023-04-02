import { lazyLoad } from 'utils/loadable';

export const EditProfilePage = lazyLoad(
  () => import('./index'),
  module => module.EditProfilePage,
);
