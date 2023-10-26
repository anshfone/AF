import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const encodedAuth: string | undefined = req.headers.authorization?.split(" ")[1];
        const jwtToken: string | undefined = req.headers.jwttoken as string;
        if (encodedAuth === process.env.AUTH_KEY) {
            next();
        } else if (jwtToken) {
            const tokenVerified: string | object = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
            next();
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
} 

export default auth;