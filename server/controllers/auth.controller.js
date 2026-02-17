import { authenticateUser } from '../services/auth.service.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // We call the BLL service here
    const userData = await authenticateUser(email, password);

    // If we reach here, authentication was successful
    res.json({ success: true, user: userData });

  } catch (error) {
    // If the BLL throws "Invalid credentials", it ends up here
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ success: false, message: error.message });
    }

    // Handle unexpected errors (like DB connection)
    console.error("System error:", error);
    res.status(500).json({ success: false, error: "Authentication service failed" });
  }
};