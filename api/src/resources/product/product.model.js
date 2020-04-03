const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const URLSlugs = require('mongoose-url-slugs');
const deletedAt = require('../../plugins/deleted-at.plugin');

const ProductSchema = new Schema(
  {
    name: { required: true, type: String },
    description: {
      short: { type: String, default: '' },
      long: { type: String, default: '' },
    },
    // type: { type: String }
    catalog_id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'catalog',
    },
    // @see https://www.easymarkets.com/eu/learn-centre/discover-trading/currency-acronyms-and-abbreviations/
    prices: {
      price: { type: Currency, default: 0 },
      currency_code: { type: String, default: 'USD' },
    },
    photos: {
      main: { type: String, default: 'no-image.jpg' },
      additional: [{ type: String }],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

ProductSchema.plugin(deletedAt, { index: true });
ProductSchema.plugin(URLSlugs('name', { field: 'slug', update: true }));

module.exports = mongoose.model('product', ProductSchema);
