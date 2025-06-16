import { z } from "zod"

export const newTransactionSchemas = z.object({
    title: z.string().min(1, { message: "title is required" }),
    amount: z.string().min(1, { message: "amount is required" }),
    category: z.string().min(1, { message: "category is required" }),
    user_id: z.string().min(1, { message: "user_id is required" }),
})