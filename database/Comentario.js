const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require("./database");

const Comentario = connection.define('respostas',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    cursoid:{
        type: Sequelize.INTEGER,
        allowNull: false

    }



});

Comentario.sync({force: false}).then(()=> {});
module.exports = Comentario;