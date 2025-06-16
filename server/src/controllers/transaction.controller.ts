import { db } from "@/db";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";

export const getAllTransactions = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    const transactions = await db.trasactions.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: "desc"
        }
    })

    res.status(200).json(new ApiResponse(200, "All transactions are fetched", transactions))
})

export const createTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { title, amount, category, user_id } = req.body

    const transaction = await db.trasactions.create({
        data: {
            title,
            amount,
            userId: user_id,
            category
        }
    })

    res.status(201).json(new ApiResponse(201, "Transaction is added", transaction))
})

export const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
    const { transactionId } = req.params

    if (!transactionId) throw new ApiError(422, "Please provide transactionId")

    const deletedTransaction = await db.trasactions.deleteMany({
        where: {
            id: transactionId
        }
    })

    if (deletedTransaction.count === 0) throw new ApiError(404, "transactionId not found")

    res.status(200).json(new ApiResponse(200, "Transaction has been deleted"))
})

export const getSummary = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!userId) throw new ApiError(422, "Please provide userId")

    const balance = await db.trasactions.aggregate({
        where: {
            userId
        },
        _sum: {
            amount: true,
        },
    })

    const income = await db.trasactions.aggregate({
        where: {
            userId,
            amount: {
                gt: 0,
            },
        },
        _sum: {
            amount: true,
        },
    })

    const expense = await db.trasactions.aggregate({
        where: {
            userId,
            amount: {
                lt: 0,
            },
        },
        _sum: {
            amount: true,
        },
    })

    res.status(200).json(new ApiResponse(200, "Data are fetched", { balance: balance._sum.amount, income: income._sum.amount, expense: expense._sum.amount }))

})