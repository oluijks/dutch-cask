const SubscriptionModel = require('./subscriptions.model');
const SubscriptionService = require('./subscription.service');

module.exports = SubscriptionService(SubscriptionModel);
