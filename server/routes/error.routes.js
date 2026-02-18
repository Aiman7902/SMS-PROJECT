import express from 'express';
import { logError } from '../controllers/error.controller.js';

const router = express.Router();

router.post('/errors', logError);

export default router;