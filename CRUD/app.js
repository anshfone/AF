import express, { json } from 'express';
import connectToDatabase from './database/mongoConfig.js';
import router from './routes/userRoutes.js';
const app = express();
const port = 3000; 

function main() {
    try {
      connectToDatabase();
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
      app.use(json());
      app.use('/api/users', router);
      } catch (error) {
          console.log(error)
      }
} 
main()
