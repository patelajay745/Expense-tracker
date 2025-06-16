import { ApiError } from "@/utils/apiError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate = (schema: z.Schema) => {

    return async (req: Request, _: Response, next: NextFunction) => {
        try {
            await schema.parse({ ...req.body })
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                next(new ApiError(422, error.issues[0].message))
            } else {
                next(new ApiError(422, error as string));
            }
        }

    }
}