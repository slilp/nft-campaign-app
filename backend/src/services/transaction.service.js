const { transactionModel, userModel } = require("../models");

const transactionServices = {
  create: async (addModel) => {
    const session = await transactionModel.startSession();
    try {
      session.startTransaction();
      const response = await transactionModel.create(addModel);
      await userModel.findOneAndUpdate(
        { _id: addModel?.from },
        { $addToSet: { transactions: response?._id } },
        {
          new: true,
        }
      );
      await session.commitTransaction();
      session.endSession();
      return response;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
  countUserTransaction: async (user) => {
    return await userModel.find({ from: user }).count();
  },
  findUserTransactions: async (user, { skip, limit }) => {
    return await userModel.find({ from: user }).skip(skip).limit(limit);
  },
};

module.exports = transactionServices;
