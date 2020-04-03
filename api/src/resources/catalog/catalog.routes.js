const routes = require('express').Router();
const CatalogController = require('./catalog.controller');

const {
  validateMongoId,
  createCatalogValidationRules,
} = require('./catalog.validation-rules');

routes
  .get('/', CatalogController.find)
  .get('/:id', validateMongoId, CatalogController.findById)
  .post('/', createCatalogValidationRules, CatalogController.create);

routes.all('/', (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = '405';
  next(error);
});

module.exports = routes;
