import express from 'express'
import dotenv from 'dotenv'
import user from './routes/user.js'
import { auth_key } from './middlewate/auth.js'
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/a',auth_key,(req,res)=>{
    res.status(200).json({
        status: "succes",
        message : "Welcome to hisar Api"
    })
})


app.use(user)

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})