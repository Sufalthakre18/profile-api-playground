import "dotenv/config";
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()
let app= express();

app.use(cors())
app.use(express.json())



app.get('/',(_ ,res)=>{
    res.send("api is running")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} `);
})
