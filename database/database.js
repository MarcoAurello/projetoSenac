
const Sequelize = require('sequelize');
const connection = new Sequelize('cursosgratuitos','root','362514',{
host:'localhost',
dialect:'mysql'
});

module.exports = connection;