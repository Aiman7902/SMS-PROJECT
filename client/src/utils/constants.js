// Base Configuration
const BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  STUDENTS: {
        LIST: `${BASE_URL}/students`,      // GET
        CREATE: `${BASE_URL}/students`,    // POST 
        DELETE: (id) => `${BASE_URL}/students/${id}`, // DELETE
        DETAILS: (id) => `${BASE_URL}/students/${id}`, // GET
  },
  TEACHERS: {
    LIST: `${BASE_URL}/teachers`,
  },
  CLASSROOMS: {
    LIST: `${BASE_URL}/classrooms`,
  },

  ERRORS: {
    LOG: `${BASE_URL}/errors`
  }
};

// Global variables (like App Name, pagination limits, etc.)
export const APP_CONFIG = {
  NAME: 'SMS Admin Pro',
  VERSION: '1.0.0',
  DEFAULT_PAGE_SIZE: 10
};
