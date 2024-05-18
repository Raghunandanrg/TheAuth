import express from "express";
import Mongoose from "mongoose";
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config()
const app = express()

Mongoose.connect(process.env.MONGO).then(() => [
    console.log("Connectrd to db server")
]).catch((err) => [
    console.log(err)
])


app.listen(3000, () => {
    console.log("server running on port 3000")
})
app.use(express.json())
app.use('/api/user/', UserRoutes)
app.use('/api/auth/', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message
    })
})