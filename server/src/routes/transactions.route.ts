import { createTransaction, deleteTransaction, getAllTransactions, getSummary } from "@/controllers/transaction.controller";
import { limitter } from "@/libs/rate-limiter";
import { isAuth } from "@/middlewares/isAuth";
import { validate } from "@/middlewares/validator";
import { newTransactionSchemas } from "@/validators/validationSchemas";
import { requireAuth } from "@clerk/express";
import { Router } from "express";

export const router = Router()

const myLimitter = limitter(1000, 15)

router.use(myLimitter)
router.use(requireAuth())

router.get("/:userId", getAllTransactions)
router.post("/", validate(newTransactionSchemas), createTransaction)
router.delete("/:transactionId", deleteTransaction)
router.get("/summary/:userId", getSummary)