import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Jamaah from "./Jamaah.js";

const File = db.define('file',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    ktp:{
        type: DataTypes.STRING,
        allowNull: true
    },
    kk:{
        type: DataTypes.STRING,
        allowNull: true
    },
    passport:{
        type: DataTypes.STRING,
        allowNull: true
    },
    foto:{
        type: DataTypes.STRING,
        allowNull: true
    },
    akteN: {
        type: DataTypes.STRING,
        allowNull: true
    },
    akteK: {
        type: DataTypes.STRING,
        allowNull: true
    }

},
{
    freezeTableName: true,
    timestamps: false
}
)

Jamaah.hasOne(File)
File.belongsTo(Jamaah)

export default File;
