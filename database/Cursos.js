const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require("./database");

const Curso = connection.define('curso',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },

    descrição:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    Duracao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    
    Categoria:{
        type: Sequelize.TEXT,
        allowNull: false
    },


    link:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    Img:{
        type: Sequelize.TEXT,
        allowNull: false
    },


});

Curso.sync({force: false}).then(()=> {});
module.exports = Curso