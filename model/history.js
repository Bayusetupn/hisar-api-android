import db from "../config/db.js";
import { DataTypes, Sequelize } from "sequelize";
import Jamaah from "./Jamaah.js";

const Riwayat = db.define('riwayat',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    value:{
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    dibuat_pada:{
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})

Jamaah.hasMany(Riwayat)
Riwayat.belongsTo(Jamaah)

export default Riwayat