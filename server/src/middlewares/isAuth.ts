import { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth } from '@clerk/express'

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {

    // const { userId } = req.auth || {};

    console.log(req)
    console.log(req.auth)
    // console.log(userId)

    // if (!userId) {
    //     res.status(401).json({ error: 'User not authenticated' })
    // }

    // req.user = await clerkClient.users.getUser(userId!)

    next()

}