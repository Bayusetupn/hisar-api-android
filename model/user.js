import db from '../config/db.js';
import { DataTypes, Sequelize } from 'sequelize';

const User = db.define('user',{
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    foto:{
        type: DataTypes.STRING,
        allowNull: true
    },
    no_ktp:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    nama:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    no_telepon:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    total_jamaah:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
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
});


export default User;