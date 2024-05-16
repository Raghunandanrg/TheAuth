import express from "express";
import Mongoose from "mongoose";
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js'
dotenv.config()
const app=express()

Mongoose.connect(process.env.MONGO).then(()=>[
    console.log("Connectrd to db server")
]).catch((err)=>[
    console.log(err)
])


app.listen(3000,()=>{
    console.log("server running on port 3000")
})

app.use('/api/user/',UserRoutes)