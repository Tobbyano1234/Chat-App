import express from 'express'
const router = express.Router();
import { auth } from '../middleware/auth'
import { getUsers, RegisterUser, logOutUser, LoginUser, getUser, isVerifiedUser, getUserFromEmail, updateUser, verifyUser, userCategory } from '../controller/userController'


router.get('/all', auth, getUsers)
router.post('/single', auth, getUserFromEmail)
router.post('/update', auth, updateUser)
router.post('/isverified', isVerifiedUser)
router.post('/register', RegisterUser)
router.post('/logout', logOutUser)
router.post('/login', LoginUser)
router.post('/one', getUser)
router.post('/category',auth, userCategory)
router.get('/verify/:token', verifyUser)


export default router
