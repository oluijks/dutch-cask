const find = SubscriptionModel => () => {
  return SubscriptionModel.find({});
};

const findById = SubscriptionModel => id => {
  return SubscriptionModel.findById({ _id: id });
};

const create = SubscriptionModel => data => {
  return SubscriptionModel.create(data);
};

const remove = SubscriptionModel => id => {
  return SubscriptionModel.findByIdAndRemove({ _id: id });
};

module.exports = SubscriptionModel => {
  return {
    find: find(SubscriptionModel),
    findById: findById(SubscriptionModel),
    create: create(SubscriptionModel),
    remove: remove(SubscriptionModel),
  };
};
