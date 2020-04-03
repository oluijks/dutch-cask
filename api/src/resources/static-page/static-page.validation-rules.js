const {check, oneOf} = require('express-validator/check');

const validateMongoId = check('id')
  .isMongoId()
  .withMessage('invalid mongoid');

const checkTitle = check('title')
  .trim()
  .exists()
  .withMessage('static page title is required');

const checkBody = check('body')
  .trim()
  .exists()
  .withMessage('static page body is required');

const createStaticPageValidationRules = oneOf([[checkTitle, checkBody]]);

module.exports = {
  validateMongoId,
  createStaticPageValidationRules,
};
