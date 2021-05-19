const { Model, DataTypes } = require('sequelize');

class Favorite extends Model {
    static init(sequelize) {
        super.init({
            repo_name: DataTypes.STRING,
            repo_url: DataTypes.STRING,
            repo_description: DataTypes.STRING,
            repo_language: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'favorites',
        })
    }
}

module.exports = Favorite