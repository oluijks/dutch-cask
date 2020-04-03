const sinon = require('sinon');
const ApiUserService = require('../products.service');

describe('Api User Service Test Suite', () => {
  test('should be defined', () => {
    expect(ApiUserService).toBeDefined();
  });

  test('find()', () => {
    const MockModel = { find: sinon.spy() };
    const apiUserService = ApiUserService(MockModel);
    apiUserService.find();

    expect(MockModel.find.calledOnce).toEqual(true);
  });

  test('findById()', () => {
    const MockModel = { findById: sinon.spy() };
    const apiUserService = ApiUserService(MockModel);
    apiUserService.findById();

    expect(MockModel.findById.calledOnce).toEqual(true);
  });

  test('create()', () => {
    const MockModel = { create: sinon.spy() };
    const apiUserService = ApiUserService(MockModel);
    apiUserService.create({ email: 'user@example.com', password: 'secret' });

    expect(MockModel.create.calledOnce).toEqual(true);
  });
});
