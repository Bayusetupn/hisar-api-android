import User from '../model/user.js'
import Jamaah from '../model/Jamaah.js'
import Riwayat from '../model/loginHistory.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import LoginHistory from '../model/loginHistory.js'
dotenv.config()

export const getUser = async(req,res) =>{
    try {
        await User.findOne({
            attributes: {
                exclude : ['password']
            },
            where: {
                id : req.body.id
            }
        }).then(response=>{
            res.status(200).json({
                message : response
            })
        })
    } catch (error) {
        res.status(400).json({
            message : "errors" + error
        })
    }
}   

export const getAllAgen = async(req,res) =>{
    try{
        await User.findAll({
            attributes:{
                exclude: ["password"]
            },
            where: {
                role : "agen"
            }
        }).then(response=>{
            res.status(200).json({
                data : response
            })
        })
    }catch(err){
        res.status(404).json({
            status: "error",
            to : "Server Error"
        })
    }
}

export const getAllUstad = async(req,res) =>{
    try{
        await User.findAll({
            attributes:{
                exclude: ["password"]
            },
            where: {
                role : "ustad"
            }
        }).then(response=>{
            res.status(200).json({
                data : response
            })
        })
    }catch(err){
        res.status(404).json({
            status: "error",
            to : "Server Error"
        })
    }
}

export const getAllJamaah = async(req,res)=>{
    try {
        await Jamaah.findAll().then(async(response)=>{
            res.status(200).json({
                data : response
            })
        }).catch(()=>{
            res.status(404).json({
                message : "error"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error"
        })
    }
}

export const getJamaahAgen = async(req,res)=>{
    try {
        await Jamaah.findAll({
            where:{
                userId : req.body.id
            }
        }).then(respon=>{
            res.status(200).json({
                data : respon
            })
        }).catch(()=>{
            res.status(404).json({
                message : "Jamaah Not Found!"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "Jamaah Not Found! " + err
        })
    }
}

export const keyToId = async(req,res)=>{
    const key = req.body.id
    try {
        jwt.verify(key,process.env.SECRETKEY,(err,decode)=>{
            res.status(200).json({
                message : decode.id
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "Jwt Not Provided"
        })
    }
}

export const getRiwayatLogin = async(req,res)=>{
    try {
        await Riwayat.findAll({
            where : {
                userId : req.body.id
            }
        }).then(respon=>{
            res.status(200).json({
                data : respon
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error"
        })
    }
}

export const editAdmin = async(req,res)=>{
    try {
        await User.findOne({
            where :  {
                role : req.body.role
            }
        }).then(async(respon)=>{
            await User.update({
                username : req.body.username,
                nama : req.body.nama
            },
            {
                where : {
                    id : respon.id
                }
            }).then(result=>{
                res.status(200).json({
                    message : "Berhasil Edit admin"
                })
            }).catch(err=>{
                res.status(409).json({
                    message : "Username Sudah Dipakai !"
                })
            })
        }).catch(err=>{
            res.status(400).json({
                message : "not found"
            })
        })
    } catch (err) {
        res.status(400).json({
            message : "error " + err
        })
    }
}

export const editPasswordAdmin = async(req,res)=>{
    try {
        await User.findOne({
            where : {
                role : req.body.role
            }
        }).then(async(result)=>{
            await User.update({
                password : await argon2.hash(req.body.password)
            },{
                where :{
                    role : req.body.role
                }
            }).then(()=>{
                res.status(200).json({
                    message : "Berhasil Ganti Password"
                })
            }).catch((err)=>{
                res.status(400).json({
                    message : "Gagal Ganti Password" + err
                })
            })
        }).catch(()=>{
            res.status(404).json({
                message : "Not Found"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "Error " + err
        })
    }
}

export const hapus = async(req,res)=>{
    try {
        await LoginHistory.destroy({
            where : {
                userId : req.body.id
            }
        })
        await Jamaah.destroy({
            where:{
                userId : req.body.id
            }
        })
        await User.destroy({
            where :{
                id : req.body.id
            }
        }).then(()=>{
            res.status(200).json({
                message : "sukses hapus!"
            })
        })
    } catch (err) {
        res.status(200).json({
            message : "error " + err
        })
    }
}

export const tambah = async(req,res)=>{
    try {
        const validate = await User.findOne({
            where : {
                username : req.body.username
            }
        })
        if(!validate){
            const ktp = await User.findOne({
                where : {
                    no_ktp : req.body.no_ktp
                }
            })
            if (!ktp) {
                await User.create({
                    no_ktp: req.body.no_ktp,
                    nama: req.body.nama,
                    alamat: req.body.alamat,
                    no_telepon: req.body.no_telepon,
                    role: req.body.role,
                    username: req.body.username,
                    password: await argon2.hash(req.body.password)
                }).then(()=>{
                    res.status(200).json({
                        message : "sukses dibuat!"
                    })
                })
            }else{
                return res.status(409).json({
                    message : "No Ktp Sudah ada!"
                })
            }
        }else {
            return res.status(409).json({
                message : "Username Sudah Dipakai!"
            })
        }
    } catch (err) {
        res.status(404).json({
            message : "error " + err
        })  
    }
}

export const editAgen = async(req,res)=>{
    try {
        await User.findOne({
            where :  {
                id : req.body.id
            }
        }).then(async(respon)=>{
            await User.update({
                username : req.body.username,
                nama : req.body.nama,
                no_ktp : req.body.no_ktp,
                alamat : req.body.alamat
            },
            {
                where : {
                    id : respon.id
                }
            }).then(result=>{
                res.status(200).json({
                    message : "Berhasil Edit"
                })
            }).catch((errs)=>{
                if (errs.errors[0].message == "no_ktp must be unique") {
                    res.status(409).json({
                        message : "No Ktp Sudah ada!"        
                    })
                }else{
                    res.status(409).json({
                        message : "Username Sudah Dipakai!"        
                    })
                }
                
            })
        }).catch(err=>{
            res.status(400).json({
                message : "not found"
            })
        })
    } catch (err) {
        res.status(400).json({
            message : "error " + err
        })
    }
}

export const editAgenPassword = async(req,res)=>{
    try {
        await User.findOne({
            where : {
                id : req.body.id
            }
        }).then(async()=>{
            await User.update({
                password : await argon2.hash(req.body.password)
            },
            {
                where : {
                    id : req.body.id
                }
            }).then(()=>{
                res.status(200).json({
                    message : "Sukses ganti password!"
                })
            }).catch(()=>{
                res.status(400).json({
                    message : "Gagal ganti password!"
                })
            })
        }).catch(()=>{
            res.status(404).json({
                message : "Not Found!"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "err " + err
        })
    }
}

export const login = async(req,res)=>{
    try {
        await User.findOne({
            where:{
                username : req.body.username,
            }
        }).then(async(respon)=>{
            const valid = await argon2.verify(respon.password,req.body.password)
            if (valid) {
                const auth_token =  jwt.sign({id: respon.id},process.env.SECRETKEY,{expiresIn: '1d'})
                res.status(200).json({
                    status : "succes",
                    to : auth_token,
                    role: respon.role
                })
            }else{
                res.status(404).json({
                    status: "error",
                    to : "Username Atau Password Anda Salah !"
                })
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            to : "Username Atau Password Anda Salah"
        })
    }
}
