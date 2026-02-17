export const apiClient = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  // 1. Get the raw text first
  const contentType = response.headers.get("content-type");
  let data;
  
  if (contentType && contentType.includes("application/json")) {
    const text = await response.text();
    data = text ? JSON.parse(text) : {};
  } else {
    data = {};
  }

  // 2. Handle Errors
  if (!response.ok) {
    // This will now show the ACTUAL error from Prisma (like "Record not found")
    throw new Error(data.error || data.message || `Error: ${response.status}`);
  }

  return data;
};