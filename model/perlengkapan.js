import db from '../config/db.js';
import { DataTypes } from 'sequelize';
import Jamaah from './Jamaah.js';

const Perkab = db.define('perlengkapan',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    koper_dll:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    kain_batik:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    kain_ihram:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    mukena:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    syal:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    buku_panduan:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    buku_doa:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    booklet_sholawat:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    booklet_peta:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName: true,
    timestamps: false
})

Jamaah.hasOne(Perkab)
Perkab.belongsTo(Jamaah)
export default Perkab;