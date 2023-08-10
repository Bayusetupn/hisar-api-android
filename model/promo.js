import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Promo = db.define('promo',{
    id : {
        type : DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false,
        validate :{
            notEmpty: true
        }
    },
    promo : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    dibuat: {
        type: DataTypes.DATE,
        defaultValue : Sequelize.fn("NOW"),
        allowNull : false,
        validate : {
            notEmpty : true
        }
    }
},{
    freezeTableName : true,
    timestamps : false
})

export default Promo