const UserService = require('../user');
const { validationResult } = require('express-validator/check');
const usersUrl = `${process.env.HOSTNAME}:${process.env.HTTPS_PORT}/api/users`;

const find = async (req, res, next) => {
  try {
    res.startTime('db', 'Database metric');
    const users = await UserService.find();
    res.endTime('db');
    if (!users || users.length < 1) {
      const data = [];
      return res.status(200).json({
        status: '200',
        count: 0,
        data,
        links: {
          self: usersUrl,
        },
      });
    }
    const data = userResponse(users, req.method);
    res.status(200).json({
      status: '200',
      count: users.length,
      data,
      links: {
        self: usersUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = errors.mapped();
      const errorAttributes = [
        {
          location: validationError.id.location,
          parameter: validationError.id.param,
          value: validationError.id.value,
          title: validationError.id.msg,
        },
      ];
      return res.status(422).json({
        status: '422',
        title: errorAttributes.title,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    const user = await UserService.findById(req.params.id);
    if (!user) {
      return userNotFoundResponse(req.params.id, res);
    }
    const data = userResponse([user], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${usersUrl}/${user._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.mapped();
      const errorAttributes = validationErrors._error.nestedErrors.map(
        errors => {
          return {
            location: errors.location,
            parameter: errors.param,
            value: errors.value,
            title: errors.msg,
          };
        }
      );
      return res.status(422).json({
        status: '422',
        title: validationErrors._error.msg,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  const { email, password, is_active } = req.body;
  try {
    const user = await UserService.create({
      email,
      password,
      is_active,
    });
    const data = userResponse([user], req.method);
    res.status(200).json({
      status: '200',
      data,
      links: {
        self: `${usersUrl}/${user._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const patch = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.mapped();
      const errorAttributes = validationErrors._error.nestedErrors.map(
        errors => {
          return {
            location: errors.location,
            parameter: errors.param,
            value: errors.value,
            title: errors.msg,
          };
        }
      );
      return res.status(422).json({
        status: '422',
        title: validationErrors._error.msg,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    const user = await UserService.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return userNotFoundResponse(req.params.id, res);
    }
    const data = userResponse([user], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${usersUrl}/${user._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = errors.mapped();
      const errorAttributes = [
        {
          location: validationError.id.location,
          parameter: validationError.id.param,
          value: validationError.id.value,
          title: validationError.id.msg,
        },
      ];
      return res.status(422).json({
        status: '422',
        title: errorAttributes.title,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    const user = await UserService.remove(req.params.id);
    if (!user) {
      return userNotFoundResponse(req.params.id, res);
    }
    const data = userResponse([user], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const userResponse = (users, method) => {
  return users.map(user => {
    return {
      type: 'users',
      id: user._id,
      attributes: {
        email: user.email,
        is_active: user.is_active,
        timestamps: {
          created_at: user.created_at,
          updated_at: user.updated_at,
          deleted_at: user.deleted_at,
        },
      },
      request: {
        method,
        link: `${usersUrl}/${user._id}`,
      },
    };
  });
};

/**
 * Not found response.
 * @param {*} id
 * @param {*} res
 */
const userNotFoundResponse = (id, res) => {
  res.status(404).json({
    status: '404',
    errors: [
      {
        title: 'Not Found',
        detail: `User with id ${id} was not found`,
      },
    ],
  });
};

module.exports = { find, findById, create, patch, remove };
