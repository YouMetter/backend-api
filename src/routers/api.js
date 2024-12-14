import express from 'express';

import { authMiddleware } from '../middlewares/authMiddleware.js';

import userController from '../controllers/userController.js';
import articleController from '../controllers/articleController.js';
import testController from '../controllers/testController.js';

export const api = express.Router();
api.use(authMiddleware);
api.post('/api/user/interest', userController.addInterest)
api.get('/api/article', articleController.getList)
api.get('/api/article/:articleId', articleController.getDetailById);
api.get('/api/test/:testName', testController.getTestByName)
api.post('/api/test/:testName', testController.submittedTest)
api.get('/api/test/:testName/score/:submittedId', testController.getScoreTestBySubmittedId)
