const { sanitize } = require('express-validator/filter');
const { check, oneOf } = require('express-validator/check');

const validateMongoId = check('id')
  .isMongoId()
  .withMessage('invalid mongo id');

const checkIsActive = check('is_active')
  .isBoolean()
  .withMessage('is_valid must be a boolean value');

const checkEmail = check('email')
  .trim()
  .exists()
  .withMessage('email is required')
  .isEmail()
  .withMessage('email is not valid')
  .normalizeEmail();

const checkPassword = check('password')
  .trim()
  .exists()
  .withMessage('password is required')
  .not()
  .isEmpty()
  .withMessage('password cannot be blank')
  .isLength({ min: 5 })
  .withMessage('password must be at least 5 characters long');

const createUserValidationRules = oneOf([
  [checkEmail, checkPassword, checkIsActive],
]);

const patchUserValidationRules = oneOf([
  [validateMongoId, checkEmail.optional(), checkIsActive.optional()],
]);

module.exports = {
  validateMongoId,
  createUserValidationRules,
  patchUserValidationRules,
};
