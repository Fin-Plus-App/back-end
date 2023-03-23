import dashboardRepository from '@/repositories/dashboard-repository';
import { conflictError, notFoundError } from '@/errors';

export async function createFavoriteTicker(userId: number, ticker: string) {
  const tickerExists = await dashboardRepository.findUserTicker(userId, ticker);

  if (tickerExists) {
    throw conflictError('The selected ticker is already registered!');
  }

  const newTicker = await dashboardRepository.create({ userId, ticker });

  return newTicker;
}

export async function findFavoriteTickers(userId: number) {
  const tickers = await dashboardRepository.findAllTickersByUserId(userId);

  if (tickers.length === 0) {
    throw notFoundError();
  }

  return tickers;
}

const dashboardService = {
  createFavoriteTicker,
  findFavoriteTickers,
};

export default dashboardService;
