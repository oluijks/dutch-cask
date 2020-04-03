const CatalogModel = require('./catalog.model');
const CatalogService = require('./catalog.service');

module.exports = CatalogService(CatalogModel);
