const path = require('path')

module.exports = {
    dialect: "sqlite",
    storage: path.resolve(__dirname, '..', 'database', 'db_git_search.sqlite'),
    define: {
        timestamps: false,
    }
}