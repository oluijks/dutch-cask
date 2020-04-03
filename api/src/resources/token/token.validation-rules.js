const { sanitize } = require('express-validator/filter');
const { check, oneOf } = require('express-validator/check');

const TokenValidationRules = oneOf([
  [
    check('email')
      .exists()
      .withMessage('email is required'),
    check('password')
      .exists()
      .withMessage('password is required'),
  ],
]);

module.exports = { TokenValidationRules };
