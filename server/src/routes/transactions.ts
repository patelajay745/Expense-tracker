import { getAllTransactions } from "@/controllers/transaction";
import { Router } from "express";

export const router = Router()

router.get("/", getAllTransactions)