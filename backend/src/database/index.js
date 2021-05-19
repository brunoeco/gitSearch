const Sequelize = require('sequelize');
const dbConfig = require('../config/database')

const User = require('../models/User');
const Favorite = require('../models/Favorite');

const connection = new Sequelize(dbConfig);

User.init(connection);
Favorite.init(connection);

module.exports = connection;