import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findUserTicker(userId: number, ticker: string) {
  return prisma.dashboard.findFirst({
    where: {
      userId,
      ticker,
    },
  });
}

async function create(data: Prisma.DashboardUncheckedCreateInput) {
  return prisma.dashboard.create({
    data,
  });
}

const dashboardRepository = {
  findUserTicker,
  create,
};

export default dashboardRepository;
