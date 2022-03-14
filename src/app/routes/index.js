const { Router } = require('express');
const controllers = require('../controllers');

const routes = new Router();

routes.get('/boleto/:number', controllers.paymentSlip);

module.exports = routes;
