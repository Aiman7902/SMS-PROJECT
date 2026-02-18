// Client-side error logger service
import { API_ENDPOINTS } from './constants';

class ErrorLogger {
  constructor() {
    this.apiEndpoint = API_ENDPOINTS.ERRORS.LOG;
  }

  /**
   * Log error to backend
   * @param {Error} error - The error object
   * @param {string} context - Where the error occurred (component name, function, etc)
   * @param {object} additionalData - Any extra context (user action, state, etc)
   */
  async logError(error, context = 'Unknown', additionalData = {}) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...additionalData
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🔴 Error logged:', errorData);
    }

    // Send to backend
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
      });
    } catch (logError) {
      // If logging fails, at least console.error it
      console.error('Failed to log error to backend:', logError);
    }
  }

  /**
   * Log API errors specifically
   */
  async logApiError(error, endpoint, method = 'GET') {
    await this.logError(error, 'API Call', {
      endpoint,
      method,
      statusCode: error.response?.status,
      responseData: error.response?.data
    });
  }

  /**
   * Log component errors (used in Error Boundaries)
   */
  async logComponentError(error, errorInfo, componentName) {
    await this.logError(error, 'React Component', {
      componentName,
      componentStack: errorInfo.componentStack
    });
  }
}

// Export singleton instance
export const errorLogger = new ErrorLogger();