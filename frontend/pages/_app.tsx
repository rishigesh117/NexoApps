import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PWAInstallPrompt } from '../components/PWAInstallPrompt';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
          <PWAInstallPrompt />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
