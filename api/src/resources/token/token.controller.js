const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../user/user.model');
const { validationResult } = require('express-validator/check');

const getToken = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const response = errors.mapped();
      const errorAttributes = response._error.nestedErrors.map(errors => {
        return {
          location: errors.location,
          parameter: errors.param,
          value: errors.value,
          title: errors.msg,
        };
      });
      return res.status(422).json({
        status: '422',
        title: response._error.msg,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  const { email, password } = req.body;

  try {
    const api_user = await UserModel.findOne({ email });
    if (!api_user || (api_user && !api_user.is_active)) {
      return unauthorizedResponse(res);
    }

    bcrypt.compare(password, api_user.password).then(result => {
      if (result) {
        const token = jwt.sign(
          {
            iss: process.env.JWT_TOKEN_ISSUER,
            sub: api_user._id,
            aud: process.env.JWT_TOKEN_AUDIENCE,
          },
          process.env.JWT_TOKEN_SECRET_KEY,
          {
            expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRES_IN, 10),
          }
        );
        res.status(200).json({
          token,
        });
      } else {
        return unauthorizedResponse(res);
      }
    });
  } catch (error) {
    next(error);
  }
};

const unauthorizedResponse = res => {
  res.status(401).json({
    status: '401',
    errors: [
      {
        title: 'Unauthorized',
      },
    ],
  });
};

module.exports = { getToken };
