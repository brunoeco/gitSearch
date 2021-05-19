const { Router } = require('express');

const userController = require('./controllers/UserController');
const favoriteController = require('./controllers/FavoriteController');

const routes = Router();

routes.get('/favorite/:id', favoriteController.index)
routes.post('/favorite', favoriteController.create)

routes.post('/register', userController.create)
routes.post('/login', userController.login)

module.exports = routes;