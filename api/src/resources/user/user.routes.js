const routes = require('express').Router();
const UserController = require('./user.controller');

const {
  validateMongoId,
  createUserValidationRules,
  patchUserValidationRules,
} = require('./user.validation-rules');

routes
  .get('/', UserController.find)
  .get('/:id', validateMongoId, UserController.findById)
  .post('/', createUserValidationRules, UserController.create)
  // .patch('/:id', patchUserValidationRules, ApiUserController.patchApiUser)
  .delete('/:id', validateMongoId, UserController.remove);

routes.all('/', (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = '405';
  next(error);
});

module.exports = routes;
