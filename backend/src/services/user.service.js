const { userModel } = require("../models");

const userServices = {
  create: async (addModel) => {
    return await userModel.create(addModel);
  },
  update: async (id, updateModel) => {
    return await userModel.findOneAndUpdate({ _id: id }, updateModel);
  },
  findByUsername: async (_username) => {
    return await userModel.findOne({ username: _username });
  },
  findById: async (id) => {
    return await userModel.findById(id);
  },
  findByAddress: async (address) => {
    return await userModel.findOne({ wallet: address });
  },
  countAll: async () => {
    return await userModel.count();
  },
};

module.exports = userServices;
