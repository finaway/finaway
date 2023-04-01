import Container from '@mui/material/Container';
import React from 'react';

interface ContantWrapperProps {
  children?: React.ReactNode;
}

export function ContentWrapper({ children }: ContantWrapperProps) {
  return <Container maxWidth="sm">{children}</Container>;
}
