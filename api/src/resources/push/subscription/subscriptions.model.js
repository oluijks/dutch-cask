const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionsSchema = new Schema(
  {
    endpoint: {
      type: String,
    },
    expirationTime: {
      type: String,
      default: null,
    },
    keys: {
      auth: {
        type: String,
      },
      p256dh: {
        type: String,
      },
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('push_subscription', SubscriptionsSchema);
