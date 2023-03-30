import { notFoundError, conflictError } from '@/errors';
import { CreateTransactionParams } from '@/protocols';
import transactionRepository from '@/repositories/transaction-repository';
import { getTickers } from '@/utils/brapi-service';

async function checkAvailability(userId: number, data: CreateTransactionParams) {
  const tickerData = await transactionRepository.findTransactionSummary(userId, data.ticker);

  let balance = 0;

  tickerData.forEach((element) => {
    if (element.status === 'BUY') {
      balance += element._sum.amount;
    } else if (element.status === 'SELL') {
      balance -= element._sum.amount;
    }
  });

  if (balance < data.amount) {
    throw conflictError('Insufficient stock balance!');
  }

  return tickerData;
}

export async function createTransaction(userId: number, data: CreateTransactionParams) {
  const tickers = await getTickers(data.ticker);

  if (!tickers.stocks.includes(data.ticker)) {
    throw notFoundError();
  }

  if (data.status === 'SELL') {
    await checkAvailability(userId, data);
  }

  const transactionData = {
    userId,
    ...data,
  };

  const transaction = await transactionRepository.createTransaction(transactionData);

  return transaction;
}

const transactionService = {
  createTransaction,
};

export default transactionService;
