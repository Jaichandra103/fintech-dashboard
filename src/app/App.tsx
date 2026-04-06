import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { DashboardProvider } from './context/DashboardContext';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="top-right"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: 'rgba(17, 24, 39, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />
      </DashboardProvider>
    </ThemeProvider>
  );
}