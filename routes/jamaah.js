import express from 'express'
import { auth_key, isLogin } from '../middlewate/auth.js'
import { editDp, getJamaahDoc, getPerkab } from '../controller/JamaahController.js'

const jamaah = express.Router()

jamaah.post('/jamaah/perkab',auth_key,isLogin,getPerkab)
jamaah.post('/jamaah/doc',auth_key,isLogin,getJamaahDoc)
jamaah.put('/jamaah/dp',auth_key,isLogin,editDp)

export default jamaah