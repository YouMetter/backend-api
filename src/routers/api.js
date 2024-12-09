import express from 'express';

import { authMiddleware } from '../middlewares/authMiddleware.js';

import userController from '../controllers/userController.js';

export const api = express.Router();
api.use(authMiddleware);
api.post('/api/user/interest', userController.addInterest)