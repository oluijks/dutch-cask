// Modules
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const serverTiming = require('server-timing');

const {
  userRoutes,
  tokenRoutes,
  apiInfoRoutes,
  catalogRoutes,
  productRoutes,
  staticPagesRoutes,
  notificationRoutes,
  subscriptionRoutes,
} = require('./resources/routes');

// Setup
const app = express();
app.disable('x-powered-by');

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(serverTiming());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Routes
const prefix = process.env.PREFIX || '/api';
app.use(`${prefix}/info`, apiInfoRoutes);
app.use(`${prefix}/users`, userRoutes);
app.use(`${prefix}/token`, tokenRoutes);
app.use(`${prefix}/catalogs`, catalogRoutes);
app.use(`${prefix}/products`, productRoutes);
app.use(`${prefix}/static-pages`, staticPagesRoutes);
app.use(`${prefix}/push/send`, notificationRoutes);
app.use(`${prefix}/push/subscriptions`, subscriptionRoutes);

// Handle 404
app.use((req, res, next) => {
  const NotFoundError = require('./errors/not-found-error');
  const error = new NotFoundError();
  next(error);
});

// Handle errors
app.use((err, req, res, next) => {
  res.status(err.status || '500');
  res.json({
    status: err.status,
    errors: [
      {
        title: err.message,
      },
    ],
  });
});

module.exports = app;
