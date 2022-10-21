import express from 'express';
import {auth} from '../middleware/auth'
import { createChat, getAllChats, getAllChatsAndUsers, getSomeChats } from '../controller/chatController';

const router = express.Router();
router.get('/users',auth, getAllChatsAndUsers)
router.post('/create',auth, createChat)
router.post('/all',auth, getAllChats)
router.post('/some',auth, getSomeChats)

export default router