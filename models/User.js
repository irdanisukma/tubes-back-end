const Sequelize = require('sequelize');
const db = require("../config/db");

const User = db.define(
    "user",
    {
        idpel: {type: Sequelize.INTEGER},
        nama: {type: Sequelize.STRING},
        status: {type: Sequelize.STRING},
        keluhan: {type: Sequelize.STRING},
        handler: {type: Sequelize.STRING}

    },
    {
        freezeTableName: true
    }
);

module.exports=User;