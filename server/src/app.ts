import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
const app: Express = express()
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express'

app.use(express.json())
app.get("/", (req, res) => {
    res.status(200).json("It is up and running...")
})
app.use(express.urlencoded({ extended: true }))
app.use(clerkMiddleware())

// import all the routes
import { router as transactionRouter } from "@/routes/transactions.route"

app.use("/api/v1/transaction", transactionRouter)

app.use(errorHandler)

export default app