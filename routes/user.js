import express from 'express'
import { auth_key, isLogin } from '../middlewate/auth.js'
import { getAllAgen, getAllJamaah, getAllUstad, login } from '../controller/UserController.js'

const user = express.Router()

user.post('/login',auth_key,login)
user.get('/agen',auth_key,isLogin,getAllAgen)
user.get('/ustad',auth_key,isLogin,getAllUstad)
user.get('/jamaah',auth_key,isLogin,getAllJamaah)


export default user