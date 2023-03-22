import { postUser } from "@/controllers";
import { validateBody } from "@/middlewares/validation-middleware";
import { createUserSchema } from "@/schemas/users-schemas";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", validateBody(createUserSchema), postUser);

export { userRouter };
