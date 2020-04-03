const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const deletedAt = require('../../plugins/deleted-at.plugin');

const StaticPageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
    },
    intro: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
  }
);

StaticPageSchema.plugin(deletedAt, {index: true});
StaticPageSchema.plugin(URLSlugs('title', {field: 'slug', update: true}));

module.exports = mongoose.model('static_page', StaticPageSchema);
