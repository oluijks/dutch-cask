const webpush = require('web-push');
const SubscriptionService = require('../subscription');
const { validationResult } = require('express-validator/check');
const SubscriptionModel = require('../subscription/subscriptions.model');

const send = async (req, res, next) => {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  // Todo: validation
  const payload = req.body;

  const subscriptions = await SubscriptionService.find();
  if (subscriptions) {
    subscriptions.map(subscription => {
      sendPushMessage(subscription, payload);
    });
  }

  const ids = subscriptions.map(subscription => {
    return subscription.id;
  });

  return res.status(200).json([
    {
      status: '200',
      count: subscriptions.length,
      ids,
      payload,
    },
  ]);
};

const sendPushMessage = (subscription, payload) => {
  return webpush
    .sendNotification(subscription, JSON.stringify(payload))
    .catch(error => {
      if (error.statusCode === 410) {
        SubscriptionModel.findByIdAndRemove(
          { _id: subscription._id },
          (error, sub) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Removed expired subscription', subscription._id);
            }
          }
        );
      }
      if (error.statusCode === 404) {
        console.log('Subscription is no longer valid: ', error);
      }
    });
};

module.exports = { send };
