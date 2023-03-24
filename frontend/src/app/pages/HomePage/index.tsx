import { useAppBarTitle } from 'app/hooks/useAppBarTitle';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  useAppBarTitle('Home');

  return (
    <>
      <Helmet>
        <title>Finaway | Home</title>
      </Helmet>
    </>
  );
}
