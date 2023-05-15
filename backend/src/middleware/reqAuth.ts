import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


export const reqAuth = (req: Request, res: Response, next: NextFunction) => {
    // check authorization
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({
        message: "Authorization header missing"
    })
    // check token
    const token = authHeader.split(" ")[1]
    if (!token) return res.status(401).json({
        message: "Unauthorized"
    })
    // verify token
    // try {
    //     const decoded = jwt.verify(token, jwtSecret);
    //     // Attach the decoded user data to the request object for further use
    //     req.user = decoded;
    //     next();
    // } catch (error) {
    //     throw new AppError('Invalid token', 401);
    // }
    next()
}