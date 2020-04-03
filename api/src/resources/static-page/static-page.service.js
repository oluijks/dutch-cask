const find = StaticPageModel => () => {
  return StaticPageModel.find({});
};

const findById = StaticPageModel => id => {
  return StaticPageModel.findById({_id: id});
};

const findBySlug = StaticPageModel => slug => {
  return StaticPageModel.findOne({slug: slug});
};

const create = StaticPageModel => data => {
  return StaticPageModel.create(data);
};

module.exports = StaticPageModel => {
  return {
    find: find(StaticPageModel),
    findById: findById(StaticPageModel),
    findBySlug: findBySlug(StaticPageModel),
    create: create(StaticPageModel),
  };
};
