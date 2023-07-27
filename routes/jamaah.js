import express from 'express'
import { auth_key, isLogin } from '../middlewate/auth.js'
import { getPerkab } from '../controller/JamaahController.js'

const jamaah = express.Router()

jamaah.post('/jamaah/perkab',auth_key,getPerkab)

export default jamaah