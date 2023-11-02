import express, { Application, json } from 'express';
import connectToDatabase from './database/mongoConfig.ts';
import userRouter from './routes/userRoutes.ts';
import postRouter from './routes/postRoutes.ts';
import cors from 'cors'

const app: Application = express();
const port: number = 3000;

async function main(): Promise<any> {
  try {
    const bucket = await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    app.use(cors());
    app.use(json());
    app.use('/api/users', userRouter);
    app.use('/api/posts/',postRouter)
    return {bucket}
  } catch (error) {
    console.log(error);
  }
}
const { bucket } = await main();
export { bucket }