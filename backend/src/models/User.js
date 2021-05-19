const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING,
            name: DataTypes.STRING,
            password_hash: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'users',
        })
    }
}

module.exports = User