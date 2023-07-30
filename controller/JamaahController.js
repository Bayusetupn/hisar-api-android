import Jamaah from "../model/Jamaah.js";
import Perkab from "../model/perlengkapan.js"
import Dokumen from "../model/file.js"

export const getPerkab = async(req,res)=>{
    try {
        await Perkab.findOne({
            where:{
                jamaahId: req.body.id
            }
        }).then(respon=>{
            res.status(200).json({
                data : respon
            })
        }).catch(()=>{
            res.status(404).json({
                message : "Perlengkapan Not Found!"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error " + err
        })
    }
}

export const getJamaahDoc = async(req,res)=>{
    try {
        await Dokumen.findOne({
            where:{
                jamaahId : req.body.id
            }
        }).then((result)=>{
            res.status(200).json({
                data : result
            })
        }).catch(err=>{
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

export const editDp = async(req,res)=>{
    try {
        await Jamaah.findOne({
            where : {
                id : req.body.id
            }
        }).then(async(result)=>{
            
            await Jamaah.update({
                dp : true
            },
            {
                where : {
                    id : result.id
                }
            }
            ).then(()=>{
                res.status(200).json({
                    message : "Sukses Edit Dp"
                })
            }).catch(()=>{
                res.message(400).json({
                    message : "Error Edit Dp"
                })
            })

        }).catch(()=>{
            res.status(404).json({
                message : "Not Found!"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error"
        })
    }
}