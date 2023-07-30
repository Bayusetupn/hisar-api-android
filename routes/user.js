import express from 'express'
import { auth_key, isLogin, profile } from '../middlewate/auth.js'
import { editAdmin, editAgen, editPasswordAdmin, getAllAgen, getAllJamaah, getAllUstad, getJamaahAgen, getRiwayatLogin, hapus, login, tambah } from '../controller/UserController.js'

const user = express.Router()

user.post('/login',auth_key,login)
user.get('/agen',auth_key,isLogin,getAllAgen)
user.get('/ustad',auth_key,isLogin,getAllUstad)
user.get('/jamaah',auth_key,isLogin,getAllJamaah)
user.get('/profile',auth_key,isLogin,profile)
user.post('/riwayat',auth_key,isLogin,getRiwayatLogin)

//add
user.post('/tambah',auth_key,isLogin,tambah)
user.delete('/hapus',auth_key,isLogin,hapus)
user.put('/agen/edit',auth_key,isLogin,editAgen)

//admin
user.put('/admin/edit',auth_key,isLogin,editAdmin)
user.put('/admin/edit/pass',auth_key,isLogin,editPasswordAdmin)

//jamaah
user.post('/agen/jamaah',auth_key,isLogin,getJamaahAgen)


export default user