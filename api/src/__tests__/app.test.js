const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tdc');

describe('App Integration Test Suite', () => {
  let server;

  beforeAll(() => {
    server = app.listen(4444);
  });

  afterAll(done => {
    mongoose.connection.close();
    server.close(done);
  });

  test('should be defined', () => {
    expect(app).toBeDefined();
  });

  test('should return a 404', async () => {
    await request(server)
      .get('/api/wtf')
      .expect(404);
  });
});
