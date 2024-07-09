import express from 'express'
import { test } from '../controllers/user.controller.js';
import { VerifyToken } from '../Utils/VerifyUser.js';
const router=express.Router();

router.get('/',test)
router.post('/update/:id',VerifyToken,updateUser)
export default router