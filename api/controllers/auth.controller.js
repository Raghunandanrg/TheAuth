import { errorHamdlerler } from '../Utils/error.js';
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const HashedPassword = bcrypt.hashSync(password, 10)
    const NewUser = new User({ username, email, password: HashedPassword });
    try {
        await NewUser.save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        next(errorHamdlerler(500, "Something went wrong"));
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHamdlerler(404, "User not found"))
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHamdlerler(401, "Wrong credentials"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWTToken)
        const { password: HashedPassword, ...rest } = validUser._doc
        res.cookie('access_token', token, { httponly: true, expires: new Date(Date.now() + 3600000)}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}