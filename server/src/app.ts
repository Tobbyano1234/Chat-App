import express, { Request, Response, NextFunction } from 'express'
import userRouter from './routes/user'
import notesRouter from './routes/notes'
import chatsRouter from './routes/chats'
import cors from 'cors';
import session from 'express-session'
import initDatabase from './config/database.config'
import path from 'path';

const app = express();

app.use(cors());


app.use(session({
    secret: 'thisggjfugkgucfgjgjfjvjgvjgvjghjvh',
    saveUninitialized: true,
    resave: true

}))

initDatabase();


app.use(express.json());
app.use('/users', userRouter);
app.use('/notes', notesRouter);
app.use('/chats', chatsRouter);


export default app;