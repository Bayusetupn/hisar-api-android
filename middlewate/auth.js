import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../model/user.js'
dotenv.config()

export const auth_key = async(req,res,next)=>{
    const key = await req.headers["x-api-key"]
    try {
        if (key == process.env.APIKEY) {
            next()
        }else{
            return res.status(400).json({
                status : "error",
                to : "not authorized"
            })
        }
    } catch (err) {
        return res.status(400).json({
            status : "error",
            to : "error"
        })
    }
}

export const isLogin = async(req,res,next)=>{
    const key = await req.headers["x-auth-token"]
    try {
        if(!key){
            return res.status(404).json({
                message : "Login first!!"
            })
        }else{
            const username = jwt.verify(key,process.env.SECRETKEY,async(errs,decode)=>{
                await User.findOne({
                    where:{
                        id : decode.id
                    }
                }).then(()=>{
                    next()
                }).catch(()=>{
                    res.status(404).json({
                        message : "Not Authorized! : " + errs
                    })
                })
            })
        }
    } catch (err) {
        res.status(404).json({
            message : "error"
        })
    }
}