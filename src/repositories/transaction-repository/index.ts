import { prisma } from '@/config';
import { CreateTransactionParams } from '@/protocols';
import { Prisma } from '@prisma/client';

async function createTransaction(data: Prisma.TransactionUncheckedCreateInput) {
  return prisma.transaction.create({
    data,
  });
}

async function findTransactionSummary(userId: number, ticker: string) {
  return prisma.transaction.groupBy({
    by: ['status'],
    _sum: {
      amount: true,
    },
    orderBy: { status: 'asc' },
  });
}

async function findAllTransactionsByUserId(userId: number) {
  return prisma.transaction.findMany({
    where: { userId },
  });
}

const transactionRepository = {
  createTransaction,
  findTransactionSummary,
  findAllTransactionsByUserId,
};

export default transactionRepository;
