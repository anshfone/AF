import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const auth = (req,res,next) => {
    try {
        const encodedAuth = req.headers.authorization?.split(" ")[1]
        const jwtToken = req.headers.jwttoken
        const tokenVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
        if (encodedAuth === process.env.AUTH_KEY || tokenVerified) {
            next()
        }
        else {
            res.status(401).send("Unauthorized")
        }
    } catch (e) {
        res.status(401).send("Unauthorized")
    }
    
} 
export default auth