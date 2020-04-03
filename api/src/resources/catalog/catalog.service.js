const find = CatalogModel => () => {
  return CatalogModel.find({});
};

const findById = CatalogModel => id => {
  return CatalogModel.findById({ _id: id });
};

const findBySlug = CatalogModel => slug => {
  return CatalogModel.findOne({ slug: slug });
};

const create = CatalogModel => data => {
  return CatalogModel.create(data);
};

module.exports = CatalogModel => {
  return {
    find: find(CatalogModel),
    findById: findById(CatalogModel),
    findBySlug: findBySlug(CatalogModel),
    create: create(CatalogModel),
  };
};
