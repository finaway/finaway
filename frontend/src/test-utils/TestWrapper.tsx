import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

interface TestWrapperProps {
  store?: ReturnType<typeof configureAppStore>;
  theme?: ReturnType<typeof createTheme>;
  children: React.ReactNode;
}

export function TestWrapper({
  store = configureAppStore(),
  theme = createTheme(),
  children,
}: TestWrapperProps) {
  return (
    <Provider store={store.store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  );
}
