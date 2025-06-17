import { createTransaction, deleteTransaction, getAllTransactions, getSummary } from "@/controllers/transaction.controller";
import { limitter } from "@/libs/rate-limiter";
import { isAuth } from "@/middlewares/isAuth";
import { validate } from "@/middlewares/validator";
import { newTransactionSchemas } from "@/validators/validationSchemas";
import { Router } from "express";

export const router = Router()

const myLimitter = limitter(100, 15)

router.use(myLimitter)
router.use(isAuth)

router.get("/:userId", getAllTransactions)
router.post("/", validate(newTransactionSchemas), createTransaction)
router.delete("/:transactionId", deleteTransaction)
router.get("/summary/:userId", getSummary)