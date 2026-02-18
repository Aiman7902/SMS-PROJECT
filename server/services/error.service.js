import prisma from '../config/prisma.js';

export const createErrorLog = async (errorData) => {
  return await prisma.errorLog.create({
    data: {
      message: errorData.message,
      stack: errorData.stack,
      context: errorData.context,
      timestamp: new Date(errorData.timestamp),
      userAgent: errorData.userAgent,
      url: errorData.url,
      endpoint: errorData.endpoint,
      method: errorData.method,
      statusCode: errorData.statusCode,
      additionalData: errorData.additionalData || {}
    }
  });
};