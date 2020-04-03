const routes = require('express').Router();
const InfoController = require('./info.controller');
const verified_token = require('../token/token.middleware');

routes
  .get('/', verified_token, InfoController.getApiInfo)
  .all('/', (req, res, next) => {
    const error = new Error('Method Not Allowed');
    error.status = '405';
    next(error);
  });

module.exports = routes;
