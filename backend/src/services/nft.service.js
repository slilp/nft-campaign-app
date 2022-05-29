const { nftModel } = require("../models");

const nftServices = {
  create: async (addModel) => {
    return await nftModel.create(addModel);
  },
  update: async (id, updateModel) => {
    return await nftModel.findOneAndUpdate({ _id: id }, updateModel);
  },
  findById: async (id) => {
    return await nftModel.findById(id);
  },
  findByOwnerAndId: async (owner, nftId) => {
    return await nftModel.findOne({ owner, nftId });
  },
  findByOwner: async (_owner) => {
    return await nftModel.find({ owner: _owner });
  },
  countAll: async (_owner) => {
    return await nftModel.count();
  },
  countFindByFilter: async (ownerFilter) => {
    return await nftModel.count({
      owner: ownerFilter,
    });
  },
  findByFilter: async (ownerFilter, { skip, limit }) => {
    return await nftModel
      .find(
        ownerFilter
          ? {
              owner: ownerFilter,
            }
          : {}
      )
      .skip(skip)
      .limit(limit);
  },
};

module.exports = nftServices;
