import React from 'react';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export function ListSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="rectangular" height={60} />
    </Stack>
  );
}
