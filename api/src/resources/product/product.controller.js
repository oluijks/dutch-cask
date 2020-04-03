const ProductService = require('../product');
const ProductModel = require('./product.model');
const { validationResult } = require('express-validator/check');
const productsUrl = `${process.env.HOSTNAME}:${
  process.env.HTTPS_PORT
}/api/products`;

const find = async (req, res, next) => {
  try {
    // res.startTime('db', 'Database metric');
    result = await ProductService.find();
    // endTime = res.endTime('db');
    if (!result || result.length < 1) {
      const products = [];
      return res.status(200).json({
        status: '200',
        count: 0,
        products,
        links: {
          self: productsUrl,
        },
      });
    }
    const products = productResponse(result, req.method);
    res.status(200).json([
      {
        status: '200',
        count: result.length,
        products,
        links: {
          self: productsUrl,
        },
      },
    ]);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = errors.mapped();
      const errorAttributes = [
        {
          location: validationError.id.location,
          parameter: validationError.id.param,
          value: validationError.id.value,
          title: validationError.id.msg,
        },
      ];
      return res.status(422).json({
        status: '422',
        title: errorAttributes.title,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }
  try {
    const product = await ProductService.findById(req.params.id);
    if (!product) {
      return productNotFoundResponse(req.params.id, res);
    }

    const data = productResponse([product], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${productsUrl}/${product._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.mapped();
      const errorAttributes = validationErrors._error.nestedErrors.map(
        errors => {
          return {
            location: errors.location,
            parameter: errors.param,
            value: errors.value,
            title: errors.msg,
          };
        }
      );
      return res.status(422).json({
        status: '422',
        title: validationErrors._error.msg,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }
  try {
    // Todo: improve this
    const { name, short_description, long_description, catalog_id } = req.body;
    const product = await ProductService.create({
      name,
      short_description,
      long_description,
      catalog_id,
    });

    const data = productResponse([product], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${productsUrl}/${product._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = errors.mapped();
      const errorAttributes = [
        {
          location: validationError.id.location,
          parameter: validationError.id.param,
          value: validationError.id.value,
          title: validationError.id.msg,
        },
      ];
      return res.status(422).json({
        status: '422',
        title: errorAttributes.title,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    console.log(req.params.id);
    const product = await ProductService.remove(req.params.id);
    if (!product) {
      return productNotFoundResponse(req.params.id, res);
    }
    const data = productResponse([product], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const productResponse = (products, method) => {
  return products.map(product => {
    return {
      type: 'product',
      product_id: product._id,
      catalog_id: product.catalog_id,
      attributes: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        prices: product.prices,
        photos: product.photos,
        timestamps: {
          created_at: product.created_at,
          updated_at: product.updated_at,
          deleted_at: product.deleted_at,
        },
      },
      request: {
        method,
        link: `${productsUrl}/${product._id}`,
      },
    };
  });
};

const productNotFoundResponse = (id, res) => {
  res.status(404).json({
    status: '404',
    errors: [
      {
        title: 'Not Found',
        detail: `Product with id ${id} was not found`,
      },
    ],
  });
};

module.exports = { find, findById, create, remove };
