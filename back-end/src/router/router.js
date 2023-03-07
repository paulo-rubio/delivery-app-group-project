const express = require('express');
const routeLogin = require('./routerLogin');
const routeUsers = require('./routerUser');
const routeProducts = require('./routerProducts');
const routeCheckout = require('./routerCheckout');

const routers = express.Router();

routers.use('/login', routeLogin);
routers.use('/users', routeUsers);
routers.use('/products', routeProducts);

routers.use('/', routeCheckout);
routers.use('/customer/products', routeProducts);

module.exports = routers;
