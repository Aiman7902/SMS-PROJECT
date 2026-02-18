import { createErrorLog } from '../services/error.service.js';

export const logError = async (req, res) => {
  try {
    const errorData = req.body;
    await createErrorLog(errorData);
    res.status(201).json({ success: true, message: 'Error logged' });
  } catch (error) {
    console.error('Failed to log error:', error);
    res.status(500).json({ success: false, message: 'Failed to log error' });
  }
};