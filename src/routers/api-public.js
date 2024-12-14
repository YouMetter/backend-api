import express from 'express';
import userController from '../controllers/userController.js';

export const apiPublic = express.Router();

apiPublic.post('/api/user/register', userController.register);
apiPublic.post('/api/user/login', userController.login);
apiPublic.get("/api/user/:id", userController.findUserById);
apiPublic.put("/api/user/:id", userController.updateUserById);