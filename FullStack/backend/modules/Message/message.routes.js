import express from 'express';
import { getChatHistory } from './message.controller.js';

const chatRouter = express.Router();

chatRouter.get('/:roomId/messages', getChatHistory);

export default chatRouter;