import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { router } from './routes';
import GlobalStyles from './styles/globalStyles';
import AppProvider from './hooks';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ToastContainer theme="colored" />
    </AppProvider>
  </StrictMode>,
);
