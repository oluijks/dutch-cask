const CatalogProductModel = require('./product.model');
const CatalogProductService = require('./product.service');

module.exports = CatalogProductService(CatalogProductModel);
