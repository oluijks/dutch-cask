#!/usr/bin/env node

require('dotenv').config();
const faker = require('faker');
const mongoose = require('mongoose');
const UserModel = require('../resources/user/user.model');
const CatalogModel = require('../resources/catalog/catalog.model');
const ProductModel = require('../resources/product/product.model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/prod');

const setUp = async _ => {
  await mongoose.connection.dropDatabase();
};

const tearDown = _ => {
  mongoose.disconnect();
};

setUp();

let catalog = null;
const createCatalog = _ => {
  catalog = new CatalogModel({ name: 'products' });
  catalog.save(error => {
    if (error) console.log(error);
  });
};

createCatalog();

const seedProducts = async data => {
  try {
    const result = await ProductModel.insertMany(data);
    if (result) {
      tearDown();
    }
  } catch (error) {
    console.log(error);
  }
};

if (catalog) {
  let data = [];
  for (i = 0; i < 40; i++) {
    const id = new mongoose.mongo.ObjectId();

    data[i] = {
      _id: id,
      name: faker.commerce.productName(),
      description: {
        short: 'Consectetur et culpa quos reiciendis.',
        long:
          'Magnam nihil ipsam laboriosam a vel. Consequatur aspernatur architecto assumenda repellat sed.'
      },
      catalog_id: catalog._id,
      prices: {
        price: Math.floor(Math.random() * (60000 - 1000 + 1)) + 2000,
        currency_code: 'USD'
      },
      photos: {
        main: `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
        additional: [
          `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
          `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
          `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
          `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
          `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
          `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
          `${Math.floor(Math.random() * 40) + 1}-main.jpg`,
        ]
      },
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
      deleted_at: null
    };
  }

  seedProducts(data);
}
