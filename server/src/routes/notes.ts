import express from 'express';
import { auth } from '../middleware/auth'
const router = express.Router();
import { createNote, updateNote, readNote, deleteNote, readAllNotes, readSomeNotes, readAllNotesByCategory, flagNote, reportedNotes } from '../controller/notesController'


router.post('/flag',auth, flagNote)
router.post('/create',auth, createNote)
router.post('/all', readAllNotes)
router.post('/reported', reportedNotes)
router.post('/category', readAllNotesByCategory)
router.post('/delete',auth, deleteNote)
router.post('/update',auth, updateNote)
router.post('/some',auth, readSomeNotes)
router.get('/:id', readNote)


export default router


