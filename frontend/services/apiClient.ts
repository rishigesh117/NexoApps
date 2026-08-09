/**
 * Modular API Client Abstraction
 * NexoApps Platform
 */

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    // For local dev machine or mobile connected to local Wi-Fi, target backend port 5000 directly
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.')) {
      return `${protocol}//${hostname}:5000/api/v1`;
    }
    // On production (Vercel, etc.), use relative path to hit Next.js serverless API routes
    return '/api/v1';
  }
  return 'http://localhost:5000/api/v1';
};

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let baseUrl = getApiBaseUrl();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    let response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    // If relative proxy returns 404 on local dev, retry with direct port 5000
    if (response.status === 404 && baseUrl === '/api/v1' && typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.')) {
        const fallbackUrl = `${window.location.protocol}//${hostname}:5000/api/v1`;
        response = await fetch(`${fallbackUrl}${endpoint}`, {
          ...options,
          headers,
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (err: any) {
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error('Unable to connect to backend server. Please make sure the backend process is running on port 5000.');
    }
    throw err;
  }
}


