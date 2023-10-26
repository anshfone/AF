import express, { Application, json } from 'express';
import connectToDatabase from './database/mongoConfig.ts';
import router from './routes/userRoutes.ts';

const app: Application = express();
const port: number = 3000;

function main(): void {
  try {
    connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    app.use(json());
    app.use('/api/users', router);
  } catch (error) {
    console.log(error);
  }
}
main();