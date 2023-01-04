const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require("./database");

const Aluno = connection.define('aluno',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },

    email:{
        type: Sequelize.TEXT,
        allowNull: false
    },

    tel:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    senha:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Aluno.sync({force: false}).then(()=> {});

module.exports = Aluno
