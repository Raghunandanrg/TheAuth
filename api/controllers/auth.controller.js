import {errorHamdlerler}  from '../Utils/error.js';
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const HashedPassword=bcrypt.hashSync(password,10)
    const NewUser = new User({ username, email, password:HashedPassword});
    try {
        await NewUser.save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        next(errorHamdlerler(500,"Something went wrong"));
    }

}