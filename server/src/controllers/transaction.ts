import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";

export const getAllTransactions = asyncHandler(async (req: Request, res: Response) => {
    res.send("reached here")
})