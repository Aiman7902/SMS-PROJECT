import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';

export const authenticateUser = async (email, password) => {
  const user = await prisma.users.findUnique({
    where: { email: email }
  });

  // Compare hashed password
  const isValid = user && await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return { 
    email: user.email, 
    role: user.role 
  };
};