import prisma from '../config/prisma.js';

export const authenticateUser = async (email, password) => {
  // Logic: Find the user
  const user = await prisma.users.findUnique({
    where: { email: email }
  });

  // Logic: Business Rule for credentials
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  // Logic: Return only what the frontend needs (Security)
  return { 
    email: user.email, 
    role: user.role 
  };
};