import dashboardRepository from '@/repositories/dashboard-repository';
import { conflictError, notFoundError, unauthorizedError } from '@/errors';

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

export async function deleteFavoriteTicker(userId: number, ticker: string) {
  const favoriteTicker = await dashboardRepository.findTickerByTicker(ticker, userId);

  if (!favoriteTicker) {
    throw notFoundError();
  }

  await dashboardRepository.deleteTickerById(favoriteTicker.id);
}

const dashboardService = {
  createFavoriteTicker,
  findFavoriteTickers,
  deleteFavoriteTicker,
};

export default dashboardService;
