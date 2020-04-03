require('dotenv').config();
const mongoose = require('mongoose');

const fs = require('fs');
const http = require('http');
const https = require('https');

const app = require('./app');

let database = '';
switch (app.get('env')) {
  case 'dev': {
    database = process.env.MONGODB_DB_DEV || 'dev';
    break;
  }
  case 'test': {
    database = process.env.MONGODB_DB_TEST || 'test';
    break;
  }
  case 'prod': {
    database = process.env.MONGODB_DB_PROD || 'prod';
    break;
  }
  case 'demo': {
    database = process.env.MONGODB_DB_DEMO || 'demo';
    break;
  }
  default:
    database = process.env.MONGODB_DB_DEV || 'prod';
}
console.log('==================', `${process.env.MONGODB_URI}/${database}`);
mongoose.connect(`${process.env.MONGODB_URI}/${database}`).then(
  _ => {
    console.log(`[Dutch Cask Api]: MongoDb database -> ${database}`);
  },
  error => console.log(error)
);
mongoose.connection.on(
  'error',
  console.log.bind(
    console,
    `[Dutch Cask Api]: MongoDb Server connection error:`
  )
);
mongoose.connection.once('open', () => {
  console.log(
    `[Dutch Cask Api]: MongoDb Server ${'->'.padStart(4)} ${
      process.env.MONGODB_URI
    }/${database}`
  );
  const admin = mongoose.connection.db.admin();
  admin.serverStatus((err, info) => {
    console.log(
      `[Dutch Cask Api]: MongoDb Version ${'->'.padStart(3)} ${info.version}`
    );
  });
});

const port = process.env.PORT || 3333;
const host = process.env.HOSTNAME || 'http://127.0.0.1';

let server = null;
if (process.env.NODE_ENV === 'prod') {
  const options = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/bristol3.pki.enigmabridge.com.dutch-cask.nl/privkey.pem'
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/bristol3.pki.enigmabridge.com.dutch-cask.nl/fullchain.pem'
    ),
  };
  app.listen(port);
  server = https
    .createServer(options, app)
    .listen(process.env.HTTPS_PORT || '8443', _ => {
      console.log(
        `[Dutch Cask Api]: App is running ${'->'.padStart(4)} ${app.get('env')}`
      );
      console.log(
        `[Dutch Cask Api]: Express Server ${'->'.padStart(4)} ${host}:${port}`
      );
    });
} else {
  // app.listen(port);
  server = http.createServer(app).listen(port, _ => {
    console.log(
      `[Dutch Cask Api]: App is running ${'->'.padStart(4)} ${app.get('env')}`
    );
    console.log(
      `[Dutch Cask Api]: Express Server ${'->'.padStart(4)} ${host}:${port}`
    );
  });
}

const gracefulShutdown = () => {
  console.log(
    '[Dutch Cask Api]: Received kill signal, shutting down gracefully'
  );
  server.close(() => {
    console.log('[Dutch Cask Api]: Closed out remaining connections');
    process.exit();
  });

  setTimeout(() => {
    console.log(
      '[Dutch Cask Api]: Could not close connections in time, forcefully shutting down'
    );
    process.exit();
  }, 10 * 1000);
};

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for a crash
process.on('uncaughtException', gracefulShutdown);
