const express = require('express');
const controllerUser = require('../controllers/controllerUser');

const routers = express.Router();

routers.post('/', controllerUser.create);

module.exports = routers;