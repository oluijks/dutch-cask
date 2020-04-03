const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test-coffee-shop');

const ApiUserModel = require('../../api/api-user/api-user.model');

describe('Api User Model Test Suite', () => {
  beforeAll(async () => {
    await ApiUserModel.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  let su1, su2;

  beforeEach(async () => {
    const nu1 = new ApiUserModel({
      email: 'usr1@example.com',
      password: 'pass1',
    });
    const nu2 = new ApiUserModel({
      email: 'usr2@example.com',
      password: 'pass2',
    });
    su1 = await nu1.save();
    su2 = await nu2.save();
  });

  afterEach(async () => {
    await ApiUserModel.remove({});
  });

  test('should be defined', () => {
    expect(ApiUserModel).toBeDefined();
  });

  test('find', async () => {
    const users = await ApiUserModel.find({});

    expect(users).toHaveLength(2);
    expect(users[0]._id).toEqual(su1._id);
    expect(users[1]._id).toEqual(su2._id);
  });

  test('findById', async () => {
    const user = await ApiUserModel.findById({ _id: su1._id });

    expect(user._id).toEqual(su1._id);
    expect(user.email).toEqual(su1.email);
  });
});
