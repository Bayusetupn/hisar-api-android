import { DataTypes, Sequelize } from 'sequelize'
import db from '../config/db.js'
import User from './user.js'

const Jamaah = db.define('jamaah',{
    id:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    foto:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ktp:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nama:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    daftarkan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jenis_kelamin:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    no_telepon:{
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    dp:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            notEmpty: true
        }
    },
    paket:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    berangkat:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    dibuat_pada:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})

User.hasMany(Jamaah)
Jamaah.belongsTo(User)

export default Jamaah;
