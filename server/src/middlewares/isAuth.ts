import { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth } from '@clerk/express'

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {

    const auth = getAuth(req)
    const userId = auth.userId

    if (!userId) {
        res.status(401).json({ error: 'User not authenticated' })
    }

    req.user = await clerkClient.users.getUser(userId!)

    next()

}