import dashboardRepository from '@/repositories/dashboard-repository';
import { conflictError } from '@/errors';

export async function createFavoriteTicker(userId: number, ticker: string) {
  const tickerExists = await dashboardRepository.findUserTicker(userId, ticker);

  if (tickerExists) {
    throw conflictError('The selected ticker is already registered!');
  }

  const newTicker = await dashboardRepository.create({ userId, ticker });

  return newTicker;
}

const dashboardService = {
  createFavoriteTicker,
};

export default dashboardService;
