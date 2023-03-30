import { getAllUserTransactions, postTransaction } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTransactionSchema } from '@/schemas/transaction-schemas';
import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.all('/*', authenticateToken);
transactionRouter.post('/', validateBody(createTransactionSchema), postTransaction);
transactionRouter.get('/all', getAllUserTransactions);

export { transactionRouter };
