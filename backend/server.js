import "dotenv/config";
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import dbConnect from "./config/db.js";


dotenv.config()
dbConnect()

const app= express();

app.use(cors())
app.use(express.json())



app.get('/',(_ ,res)=>{
    res.send("api is running")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} `);
})
