import { AuthenticatedRequest } from '@/middlewares';
import { CreateTransactionParams } from '@/protocols';
import transactionService from '@/services/transaction-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function postTransaction(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const data = req.body as CreateTransactionParams;

  try {
    const transaction = await transactionService.createTransaction(userId, data);

    return res.status(httpStatus.CREATED).send(transaction);
  } catch (error) {
    if (error.name === 'ConflictError') {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
