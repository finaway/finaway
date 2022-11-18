import { useAuthSlice } from 'app/global-stores/auth';
import { useRouterSlice } from 'app/global-stores/router';

export const slices = [useAuthSlice, useRouterSlice];
