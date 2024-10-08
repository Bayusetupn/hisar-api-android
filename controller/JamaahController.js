import Jamaah from "../model/Jamaah.js";
import Perkab from "../model/perlengkapan.js"
import Dokumen from "../model/file.js"
import Riwayat from "../model/history.js"
import User from "../model/user.js";
import { where } from "sequelize";

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

export const addJamaah = async(req,res)=>{
    try {
        await User.findOne({
            where : {
                id: req.body.id
            }
        }).then(async(result)=>{
            await User.update({
                total_jamaah : Sequelize.literal('total_jamaah + 1')
            })
            await Jamaah.create({
                ktp : req.body.ktp,
                nama : req.body.nama,
                daftarkan: result.nama,
                jenis_kelamin:req.body.kelamin,
                no_telepon:req.body.telp,
                alamat: req.body.alamat,
                dp:false,
                paket: req.body.paket,
                userId: req.body.id
    
            }).then(async(response)=>{
                Perkab.create({
                    jamaahId: response.id
                })
                Dokumen.create({
                    jamaahId: response.id
                }).then(()=>{
                    res.status(200).json({
                        message : "Sukses"
                    })
                })
            }).catch((er)=>{
                res.status(400).json({
                    message : "Gagal Tambah Jamaah! " + er
                })
            })
        }).catch(()=>{
            res.status(404).json({
                message : "user not found!"
            })
        })
        
    } catch (err) {
        res.status(400).json({
            message : "Gagal Tambah Jamaah! " + err
        })
    }
}

export const deleteJamaah = async(req,res)=>{
    try {
        await Perkab.destroy({
            where : {
                jamaahId : req.body.id
            }
        }).then(async()=>{
            await Dokumen.destroy({
                where : {
                    jamaahId : req.body.id
                }
            }).then(async()=>{
                await Jamaah.destroy({
                    where : {
                        id : req.body.id
                    }
                }).then(async()=>{
                    await User.findOne({
                        where : {
                            id: req.body.userId
                        }
                    }).then((result)=>{
                        result.decrement('total_jamaah',{by: 1}).then(()=>{
                            res.status(200).json({
                                message : "Sukses Hapus Jamaah"
                            })
                        })
                    })
                }).catch(errs=>{
                    res.status(200).json({
                        message : errs
                    })
                })
            }).catch(errs=>{
                res.status(200).json({
                    message : errs
                })
            })
        }).catch((errr)=>{
            res.status(400).json({
                message : "Gagal Hapus Jamaah " + errr
            })
        })
    } catch (err) {
        res.status(400).json({
            message : "Gagal Hapus Jamaah " + err
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

export const riwayatJadwal = async(req,res)=>{
    try {
        await Riwayat.findAll({
            where : {
                jamaahId : req.body.id
            }
        }).then(result=>{
            res.status(200).json({
                data : result
            })
        }).catch(()=>{
            res.status(404).json({
                message : "Not Found"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "error " + err
        })
    }
}

export const setJadwal = async(req,res)=>{
    try {
        await Jamaah.findOne({
            where: {
                id: req.body.id
            }
        }).then(async(result)=>{
            await Jamaah.update({
                berangkat : req.body.dibuat
            },{
                where : {
                    id : result.id
                }
            }).then(async()=>{
                await Riwayat.create({
                    value : req.body.dibuat,
                    jamaahId: req.body.id
                }).then(()=>{
                    res.status(200).json({
                        message : "Sukses update jadwal"
                    })
                }).catch(()=>{
                    res.status(400).json({
                        message : "Gagal update jadwal"
                    })
                })
            }).catch(()=>{
                res.status(404).json({
                    message : "Not Found !"
                })
            })
        }).catch(()=>{
            res.status(404).json({
                message : "Not Found !"
            })
        })
    } catch (err) {
        res.status(404).json({
            message : "err " + err
        })
    }
}

export const editPerkab = async(req,res)=>{
    try {
        await Perkab.findOne({
            where : {
                jamaahId : req.body.id
            }
        }).then(async(result)=>{
            await Perkab.update({
                booklet_peta : req.body.booklet_peta,
                koper_dll : req.body.koper_dll,
                kain_batik : req.body.kain_batik,
                syal : req.body.syal,
                mukena : req.body.mukena,
                buku_panduan : req.body.buku_panduan,
                kain_ihram : req.body.kain_ihram,
                buku_doa : req.body.buku_doa,
                booklet_sholawat : req.body.booklet_sholawat
            },{
                where : {
                    id : result.id
                }
            }).then(()=>{
                res.status(200).json({
                    message : "Sukses Update Perkab"
                })
            }).catch((errs)=>{
                res.status(404).json({
                    message  :"Error Update Perkab " + errs
                })
            })
        }).catch(err=>{
            res.status(404).json({
                message  :"Perkab Not Found " + err
            })
        })
    } catch (err) {
        res.status(404).json({
            message  :"Perkab Not Found " + err
        })
    }
}

export const editJamaah = async(req,res)=>{
    try {
        await Jamaah.update({
            ktp: req.body.ktp,
            nama:req.body.nama,
            jenis_kelamin : req.body.kelamin,
            no_telepon : req.body.telp,
            alamat:req.body.alamat,
            paket : req.body.paket
        },{
            where : {
                id: req.body.id
            }
        }).catch(err=>{
            res.status(404).json({
                message : "Gagal Update Jamaah " +err
            })
        }).then(()=>{
            res.status(200).json({
                message : "Sukses Edit Jamaah"
            })
        })
    } catch (err) {
        res.status(400).json({
            message : "error " + err
        })
    }
}