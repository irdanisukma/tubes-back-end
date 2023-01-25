const sequelize=require('sequelize');

const db = new sequelize("tubes", "root", "", {
    dialect: "mysql"
});

db.sync({});

module.exports = db;