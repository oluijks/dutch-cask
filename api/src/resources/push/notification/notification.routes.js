const routes = require('express').Router();
const NotificationController = require('./notification.controller');

routes.post('/', NotificationController.send);
routes.all('/', (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = '405';
  next(error);
});

module.exports = routes;
