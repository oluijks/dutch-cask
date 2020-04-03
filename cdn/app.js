const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const nofavicon = require('express-no-favicons');
require(`${__dirname}/lib/helper.js`);

// Setup
const app = express();
app.disable('x-powered-by');

// Middleware
app.use(helmet());
app.use(nofavicon());
app.use(morgan('dev'));
app.use(compression());

// Static options
let options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  immutable: true,
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res, path, stat) {
    let mime = Helper.getMime(path);
    res.set('Content-Type', mime);
  },
};

// Serve static content
app.use(express.static(path.join(__dirname, 'public'), options));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.status(200).json(err);
});

module.exports = app;
