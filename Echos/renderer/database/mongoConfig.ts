import crypto from "crypto"
import multer, { Multer } from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";
import mongoose from "mongoose";
import Grid from "gridfs-stream"
import dotenv from 'dotenv';
dotenv.config();

const username: string | undefined = encodeURIComponent(process.env.DB_USERNAME);
const password: string | undefined = encodeURIComponent(process.env.DB_PASSWORD);
export const mongoURI  = `mongodb+srv://${username}:${password}@cluster0.dhuquz9.mongodb.net/DBR`

const setupGridFS = async (): Promise<any> => {
  return new Promise((resolve,reject) => {
    const conn = mongoose.createConnection(mongoURI)
    const storage = new GridFsStorage({
        url: mongoURI,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
              };
              resolve(fileInfo);
            });
          });
        }
      })
    const upload: Multer = multer({ storage });
    let gfs: any, gridfsBucket: any
    conn.once("open",() => {
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: 'uploads'
        });
        gfs = Grid(conn.db,mongoose.mongo)
        gfs.collection("uploads")
        resolve({ upload, gfs, gridfsBucket })
    })
  })
}
  
const connectToDatabase = async (): Promise<any> => {
    await mongoose.connect(mongoURI)
    console.log("Db connected")
    const { upload, gfs, gridfsBucket } = await setupGridFS()
    return { upload, gfs, gridfsBucket }
}
const { upload, gfs, gridfsBucket } = await connectToDatabase()
export { upload, gfs, gridfsBucket }

