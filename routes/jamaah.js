import express from 'express'
import { auth_key, isLogin } from '../middlewate/auth.js'
import { addJamaah, editDp, getJamaahDoc, getPerkab, riwayatJadwal, setJadwal } from '../controller/JamaahController.js'

const jamaah = express.Router()

jamaah.post('/jamaah/perkab',auth_key,isLogin,getPerkab)
jamaah.post('/jamaah/doc',auth_key,isLogin,getJamaahDoc)
jamaah.put('/jamaah/dp',auth_key,isLogin,editDp)
jamaah.post('/jamaah/jadwal',auth_key,isLogin,riwayatJadwal)
jamaah.post('/jamaah/update/jadwal',auth_key,isLogin,setJadwal)
jamaah.post('/jamaah/tambah',auth_key,isLogin,addJamaah)

export default jamaah