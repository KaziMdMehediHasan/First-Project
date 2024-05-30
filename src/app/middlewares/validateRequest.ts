import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return (async (req: Request, res: Response, next: NextFunction) => {
        try {
            // validation with zod
            // if everything alright next()->
            await schema.parseAsync({
                body: req.body
            });
            next();
        } catch (error) {
            next(error);
        }
    })
}

export default validateRequest;