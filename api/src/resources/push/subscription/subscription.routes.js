const routes = require('express').Router();
const SubscriptionController = require('./subscription.controller');

const {
  validateMongoId,
  createSubscriptionValidationRules,
} = require('./subscription.validation-rules');

routes
  .get('/', validateMongoId, SubscriptionController.find)
  .get('/:id', validateMongoId, SubscriptionController.findById)
  .post('/', createSubscriptionValidationRules, SubscriptionController.create)
  .delete('/:id', validateMongoId, SubscriptionController.remove);

routes.all('/', (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = '405';
  next(error);
});

module.exports = routes;
