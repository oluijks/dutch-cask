const routes = require('express').Router();
const ProductController = require('./product.controller');

const {
  validateMongoId,
  createProductValidationRules,
} = require('./product.validation-rules');

routes
  .get('/', ProductController.find)
  .get('/:id', validateMongoId, ProductController.findById)
  .post('/', createProductValidationRules, ProductController.create)
  .delete('/:id', validateMongoId, ProductController.remove);

routes.all('/', (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = '405';
  next(error);
});

module.exports = routes;
