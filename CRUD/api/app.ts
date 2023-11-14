import express, { Application, json } from 'express';
import bodyParser from "body-parser"
import methodOverride from "method-override"
import userRouter from './routes/userRoutes.ts';
import postRouter from './routes/postRoutes.ts';
import cors from 'cors'

const app: Application = express();
const port: number = 3000;

async function main(): Promise<any> {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    app.use(bodyParser.json())
    app.use(cors());
    app.use(json());
    app.use(methodOverride('_method'))
    app.use('/api/users', userRouter);
    app.use('/api/posts/',postRouter)
  } catch (error) {
    console.log(error);
  }
}
await main()