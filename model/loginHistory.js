import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import User from "./user.js";

const LoginHistory = db.define('login_history',{
    id:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    login:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
},{
    freezeTableName: true,
    timestamps: false
})

User.hasMany(LoginHistory)
LoginHistory.belongsTo(User)

export default LoginHistory