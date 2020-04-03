const CatalogModel = require('./catalog.model');
const CatalogService = require('../catalog');
const { validationResult } = require('express-validator/check');
const catalogUrl = `${process.env.HOSTNAME}:${
  process.env.HTTPS_PORT
}/api/catalogs`;

/**
 * Find catalogs.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const find = async (req, res, next) => {
  try {
    const result = await CatalogService.find();
    if (!result || result.length < 1) {
      const catalogs = [];
      return res.status(200).json({
        status: '200',
        count: 0,
        catalogs,
        links: {
          self: catalogUrl,
        },
      });
    }
    const catalogs = catalogResponse(result, req.method);
    res.status(200).json([
      {
        status: '200',
        count: result.length,
        catalogs,
        links: {
          self: catalogUrl,
        },
      },
    ]);
  } catch (error) {
    next(error);
  }
};

/**
 * Find catalog by id.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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
    const catalog = await CatalogService.findById(req.params.id);
    if (!catalog) {
      return catalogNotFoundResponse(req.params.id, res);
    }

    const data = catalogResponse([catalog], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${catalogUrl}/${catalog._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a catalog.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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
    const { name } = req.body;
    const catalog = await CatalogService.create({
      name,
    });
    res.status(200).json(catalog);
  } catch (error) {
    next(error);
  }
};

/**
 * Default response.
 * @param {*} catalogs
 * @param {*} method
 */
const catalogResponse = (catalogs, method) => {
  return catalogs.map(catalog => {
    return {
      type: 'catalog',
      catalog_id: catalog._id,
      attributes: {
        name: catalog.name,
        timestamps: {
          created_at: catalog.created_at,
          updated_at: catalog.updated_at,
        },
      },
      categories: catalog.categories,
      request: {
        method,
        link: `${catalogUrl}/${catalog._id}`,
      },
    };
  });
};

/**
 * Not found response.
 * @param {*} id
 * @param {*} res
 */
const catalogNotFoundResponse = (id, res) => {
  res.status(404).json({
    status: '404',
    errors: [
      {
        title: 'Not Found',
        detail: `Api Catalog with id ${id} was not found`,
      },
    ],
  });
};

module.exports = { find, findById, create };
