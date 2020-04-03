const find = ProductModel => () => {
  return ProductModel.find({});
};

const findById = ProductModel => id => {
  return ProductModel.findById({ _id: id });
};

const findBySlug = ProductModel => slug => {
  return ProductModel.findOne({ slug: slug });
};

const create = ProductModel => data => {
  return ProductModel.create(data);
};

const remove = ProductModel => id => {
  return ProductModel.findByIdAndRemove({ _id: id });
};

module.exports = ProductModel => {
  return {
    find: find(ProductModel),
    findById: findById(ProductModel),
    findBySlug: findBySlug(ProductModel),
    create: create(ProductModel),
    remove: remove(ProductModel),
  };
};
