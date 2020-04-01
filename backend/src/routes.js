const express = require('express');

const ChefController = require('../src/controllers/ChefController');

const routes = express.Router();

routes.post('/chefs', ChefController.create);

module.exports = routes;