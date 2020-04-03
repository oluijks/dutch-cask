const SubscriptionService = require('../subscription');
const { validationResult } = require('express-validator/check');
const subscriptionUrl = `${process.env.HOSTNAME}:${
  process.env.HTTPS_PORT
}/api/push/subscriptions`;

/**
 * Find push notification subscriptions.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const find = async (req, res, next) => {
  try {
    const result = await SubscriptionService.find();
    if (!result || result.length < 1) {
      const push_notification_subscription = [];
      return res.status(200).json({
        status: '200',
        count: 0,
        push_notification_subscription,
        links: {
          self: subscriptionUrl,
        },
      });
    }
    const push_subscription = subscriptionResponse(result, req.method);
    res.status(200).json([
      {
        status: '200',
        count: result.length,
        push_subscription,
        links: {
          self: subscriptionUrl,
        },
      },
    ]);
  } catch (error) {
    next(error);
  }
};

/**
 * Find push notification subscription by id.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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
    const push_subscription = await SubscriptionService.findById(req.params.id);
    if (!push_subscription) {
      return subscriptionNotFoundResponse(req.params.id, res);
    }

    const data = subscriptionResponse([push_subscription], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${subscriptionUrl}/${push_subscription._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a push notification subscription.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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

  try {
    const { endpoint, experiationTime, keys } = req.body;
    const push_subscription = await SubscriptionService.create({
      endpoint,
      experiationTime,
      keys,
    });
    res.status(200).json(push_subscription);
  } catch (error) {
    next(error);
  }
};

/**
 * Remove an api user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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
    const push_notification_subscription = await SubscriptionService.remove(
      req.params.id
    );
    if (!push_notification_subscription) {
      return subscriptionNotFoundResponse(req.params.id, res);
    }
    const data = subscriptionResponse(
      [push_notification_subscription],
      req.method
    );
    res.status(200).json({
      status: '200',
      count: 1,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Default response.
 * @param {*} push_subscriptions
 * @param {*} method
 */
const subscriptionResponse = (push_subscriptions, method) => {
  return push_subscriptions.map(push_subscription => {
    return {
      type: 'push_subscription',
      id: push_subscription._id,
      attributes: {
        endpoint: push_subscription.endpoint,
        expirationTime: push_subscription.experiationTime,
        keys: {
          auth: push_subscription.keys.auth,
          p256dh: push_subscription.keys.p256dh,
        },
        created_at: push_subscription.created_at,
        updated_at: push_subscription.updated_at,
      },
      categories: push_subscription.categories,
      request: {
        method,
        link: `${subscriptionUrl}/${push_subscription._id}`,
      },
    };
  });
};

/**
 * Not found response.
 * @param {*} id
 * @param {*} res
 */
const subscriptionNotFoundResponse = (id, res) => {
  res.status(404).json({
    status: '404',
    errors: [
      {
        title: 'Not Found',
        detail: `Push subscription with id ${id} was not found`,
      },
    ],
  });
};

module.exports = { findById, find, create, remove };
