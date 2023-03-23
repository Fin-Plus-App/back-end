import { getFavoriteTickers, postFavoriteStock } from '@/controllers/dashboard-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createFavoriteStockSchema } from '@/schemas';
import { Router } from 'express';

const dashboardRouter = Router();

dashboardRouter.all('/*', authenticateToken);
dashboardRouter.post('/favorites', validateBody(createFavoriteStockSchema), postFavoriteStock);
dashboardRouter.get('/favorites', getFavoriteTickers);

export { dashboardRouter };
