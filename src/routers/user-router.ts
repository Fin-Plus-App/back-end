import { postUser } from '@/controllers';
import { validateBody } from '@/middlewares';
import { createUserSchema } from '@/schemas';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), postUser);

export { userRouter };
