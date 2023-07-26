import Jamaah from "../model/Jamaah.js";
import Perkab from "../model/perlengkapan.js"

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