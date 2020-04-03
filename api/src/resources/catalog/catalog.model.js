const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatalogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('catalog', CatalogSchema);
