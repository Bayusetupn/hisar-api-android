import Promo from "../model/promo.js";
import fs from 'fs'

export const getAllPromo = async(req,res)=>{
    try {
        await Promo.findAll({
            order : [['dibuat',"DESC"]]
        }).then((result)=>{
            res.status(200).json({
                data : result
            })
        }).catch((err)=>{
            res.status(404).json({
                message : "error " + err
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error " + err
        })
    }
}

export const deletePromo = async(req,res)=>{
    try {
        const promo = await Promo.findOne({
            where : {
                id : req.body.id
            }
        })
        fs.unlinkSync(`./${promo.promo}`)
        await Promo.destroy({
            where : {
                id : req.body.id
            }
        }).then(()=>{
            res.status(200).json({
                message : "Sukses Hapus Promo"
            })
        })
        .catch((err)=>{
            res.status(404).json({
                message : "error " + err
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error " + err
        })
    }
}

export const addPromo = async(req,res)=>{
    try {
        await Promo.create({
            promo : req.file.path
        }).then(()=>{
            res.status(201).json({
                message : "Sukses Menambah Promo"
            })
        }).catch((err)=>{
            res.status(404).json({
                message : "error " + err
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error " + err
        })
    }
}