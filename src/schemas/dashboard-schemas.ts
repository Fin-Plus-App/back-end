import { CreateFavoriteStockParams } from '@/protocols';
import Joi from 'joi';

export const createFavoriteStockSchema = Joi.object<CreateFavoriteStockParams>({
  ticker: Joi.string().required(),
});
