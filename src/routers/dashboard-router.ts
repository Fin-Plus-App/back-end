import { postFavoriteStock } from '@/controllers/dashboard-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createFavoriteStockSchema } from '@/schemas';
import { Router } from 'express';

const dashboardRouter = Router();

dashboardRouter.all('/*', authenticateToken);
dashboardRouter.post('/favorites', validateBody(createFavoriteStockSchema), postFavoriteStock);

export { dashboardRouter };
