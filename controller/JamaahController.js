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