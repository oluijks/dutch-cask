const app = require('../../../../app');
const request = require('supertest');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test-coffee-shop');

describe('Api Users Integration Test Suite', () => {
  let server;

  beforeAll(async () => {
    server = await app.listen(4444);
  });

  afterAll(async done => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    server.close(done);
  });

  describe('GET /api/api-users', () => {
    test('should return all api users', async () => {
      await request(server)
        .get('/api/api-users')
        .expect(200);
    });
  });

  describe('POST /api/api-users', () => {
    test('should create api users', async () => {
      await request(server)
        .post('/api/api-users')
        .send({ email: 'user@example.com', password: 'secret' })
        .expect(200);
    });
  });
});
