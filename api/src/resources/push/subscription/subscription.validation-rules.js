const { sanitize } = require('express-validator/filter');
const { check, oneOf } = require('express-validator/check');

const validateMongoId = check('id')
  .isMongoId()
  .withMessage('invalid mongoid');

const checkEndpoint = check('endpoint')
  .trim()
  .exists()
  .withMessage('endpoint is required');

const checkKeysAuth = check('keys.auth')
  .trim()
  .not()
  .isEmpty()
  .withMessage('auth is required');

const checkKeysP256dh = check('keys.p256dh')
  .trim()
  .not()
  .isEmpty()
  .withMessage('p256dh is required');

const createSubscriptionValidationRules = oneOf([
  [checkEndpoint, checkKeysAuth, checkKeysP256dh],
]);

module.exports = {
  validateMongoId,
  createSubscriptionValidationRules,
};
