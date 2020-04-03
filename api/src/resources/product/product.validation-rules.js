const { sanitize } = require('express-validator/filter');
const { check, oneOf } = require('express-validator/check');

const validateMongoId = check('id')
  .isMongoId()
  .withMessage('invalid mongo id');

const checkName = check('name')
  .trim()
  .exists()
  .withMessage('name is required')
  .not()
  .isEmpty()
  .withMessage('name cannot be blank');

const checkCatalodId = check('catalog_id')
  .isMongoId()
  .withMessage('invalid catalog mongo id');

const createProductValidationRules = oneOf([[checkName, checkCatalodId]]);

module.exports = {
  validateMongoId,
  createProductValidationRules,
};
