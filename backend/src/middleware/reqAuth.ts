import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Extend the Request interface
declare global {
    namespace Express {
        interface Request{
            user?: any;
        }
    }
}

export const reqAuth = (req: Request, res: Response, next: NextFunction) => {

    // check authorization
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({
        message: "Authorization header missing"
    })

    // check token
    const token = authHeader.split(" ")[1]
    if (!token) return res.status(401).json({
        message: 'No token provided'
    })

    // verify token
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        // Attach the decoded token to the request object for further user
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: Invalid token'
        });
    }
}
