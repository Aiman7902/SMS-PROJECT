import express from 'express';
import cors from 'cors';

// Import Modular Routes
import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js'; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes "Switchboard"
// This matches your Frontend constants: http://localhost:5000/api/students
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});