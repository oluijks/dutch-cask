const routes = require('express').Router();
const StaticPageController = require('./static-page.controller');

const {
  createStaticPageValidationRules,
  validateMongoId,
} = require('./static-page.validation-rules');

routes
  .get('/', StaticPageController.find)
  .get('/:id', validateMongoId, StaticPageController.findById)
  .get('/slug/:slug', StaticPageController.findBySlug)
  .post('/', createStaticPageValidationRules, StaticPageController.create);

routes.all('/', (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = '405';
  next(error);
});

module.exports = routes;
