import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import * as argon2 from "argon2";
import dotenv from 'dotenv';
import Users from "../models/userModel.ts";
dotenv.config();

interface JwtToken {
    name: string,
    email: string
}

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const jwtToken: string | undefined = req.headers.jwttoken as string;
        const tokenVerified: JwtToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY) as JwtToken;
        req.body.email = tokenVerified.email
        next();
    }
     catch (e) {
        res.status(401).send("Unauthorized");
    }
} 

export default auth;