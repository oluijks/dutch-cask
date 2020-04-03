module.exports = class NotFoundError extends require('./app-errors') {
  constructor(message) {
    super(message || 'Not Found', 404);
  }
};
