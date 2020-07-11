const routes = require('express').Router();

const UserController = require('./controllers/UserController');

routes.get('/users', UserController.index);

module.exports = routes;