const routes = require('express').Router();
const TokenController = require('./token.controller');
const { TokenValidationRules } = require('./token.validation-rules');

routes.post('/', TokenValidationRules, TokenController.getToken);
routes.all('/', (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = '405';
  next(error);
});

module.exports = routes;
