const { sanitize } = require('express-validator/filter');
const { check, oneOf } = require('express-validator/check');

const validateMongoId = check('id')
  .isMongoId()
  .withMessage('invalid mongoid');

const checkName = check('name')
  .trim()
  .exists()
  .withMessage('catalog name is required');

const createCatalogValidationRules = oneOf([[checkName]]);

module.exports = {
  validateMongoId,
  createCatalogValidationRules,
};
