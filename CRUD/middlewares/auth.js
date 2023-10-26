import dotenv from 'dotenv';
dotenv.config();

const auth = (req,res,next) => {
    const encodedAuth = req.headers.authorization?.split(" ")[1]
    if (encodedAuth === process.env.AUTH_KEY) {
        next()
    }
    else {
        res.status(401).send("Unauthorized")
    }
} 
export default auth