import { errorLogger } from './ErrorLogger';

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...(options.body && { body: JSON.stringify(options.body) }),
  };

  try {
    const response = await fetch(endpoint, config);
    
    // Try to parse JSON response (even if error)
    const data = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      const error = new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      error.response = {
        status: response.status,
        data: data
      };
      throw error;
    }
    
    return data;
  } catch (error) {
    // Log API errors automatically
    await errorLogger.logApiError(error, endpoint, config.method);
    throw error; // Re-throw so component can handle it
  }
};