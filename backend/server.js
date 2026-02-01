import "dotenv/config";
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import dbConnect from "./config/db.js";
dotenv.config()

import authRoutes from "./routes/auth.routes.js"
import profileRoutes from "./routes/profile.routes.js"


const app= express();
dbConnect()

app.use(cors())
app.use(express.json())



app.get('/',(_ ,res)=>{
    res.send("api is running")
})
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  });
});
app.use('/api/auth',authRoutes);
app.use('/api',profileRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} `);
})
