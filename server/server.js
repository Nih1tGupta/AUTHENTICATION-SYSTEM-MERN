import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import'dotenv/config';
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
const app=express();
const port=process.env.PORT||4000
connectDB();


const allowedOrigins=['http://localhost:5173']
// all req will be passed using json
app.use(express.json())
app.use(cookieParser());
// so that we can sedn cookies in response in express app
app.use(cors({origin:allowedOrigins,credentials:true}))

// API ENDPOINTS
app.get('/',(req,res)=>{
    res.send("API WORKING")
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(port,()=>console.log(`SERVER LISTENING AT ${port}`))
