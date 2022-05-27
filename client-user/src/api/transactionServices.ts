import request from "./request";
import { ITransactionModel } from "./types/TransactionType";

export const getTransaction = async (): Promise<ITransactionModel> => {
  const response = await request.get<ITransactionModel>("/user/transaction");
  return response.data;
};
