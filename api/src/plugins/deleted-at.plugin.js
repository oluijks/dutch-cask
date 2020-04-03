module.exports = exports = function deletedAtPlugin(schema, options) {
  schema.add({ deleted_at: Date });

  schema.pre('save', function(next) {
    this.deleted_at = null;
    next();
  });

  if (options && options.index) {
    schema.path('deleted_at').index(options.index);
  }
};
