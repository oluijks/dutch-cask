const find = UserModel => () => {
  return UserModel.find({});
};

const findById = UserModel => id => {
  return UserModel.findById({ _id: id });
};

const create = UserModel => data => {
  return UserModel.create(data);
};

const remove = UserModel => id => {
  return UserModel.findByIdAndRemove({ _id: id });
};

const patch = UserModel => (id, body) => {
  return UserModel.findByIdAndUpdate(
    {
      _id: id,
    },
    body,
    { new: true }
  );
};

module.exports = UserModel => {
  return {
    find: find(UserModel),
    findById: findById(UserModel),
    create: create(UserModel),
    remove: remove(UserModel),
  };
};
