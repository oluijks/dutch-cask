const jwt = require('jsonwebtoken');

const verified_token = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const request_token = req.headers.authorization.split(' ')[1];
    try {
      const token = jwt.verify(
        request_token,
        process.env.JWT_TOKEN_SECRET_KEY,
        {
          audience: process.env.JWT_TOKEN_AUDIENCE,
          issuer: process.env.JWT_TOKEN_ISSUER,
        }
      );
      req.verified_token = token;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: {
            status: 401,
            title: error.name,
            message: error.message,
            expired_at: error.expiredAt,
          },
        });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          error: {
            status: 401,
            title: error.name,
            message: error.message,
          },
        });
      }
      return res.status(401).json({
        error: {
          status: 401,
          message: 'Unauthorized',
        },
      });
    }
  } else {
    return res.status(403).json({
      error: {
        status: 403,
        message: 'Forbidden',
      },
    });
  }
};

module.exports = verified_token;
