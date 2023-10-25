import express, { json } from 'express';
import connectToDatabase from './mongoConfig.js';
import { Users } from './schemas.js';
const app = express();
const port = 3000; 

function main() {
    try {
      connectToDatabase();
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
      app.use(json());
      app.get('/api/users', async (req, res) => {
        try {
          const users = await Users.find({});
          res.json(users); 
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
        });
      app.post('/api/user/save',async (req,res) => {
          try {
              const newUser = new Users({name: req.body.name})
              await newUser.save()
              res.sendStatus(200)
          } catch (error) {
            console.log(error)
            res.status(500)
          }
        })
      app.patch('/api/user/edit', async (req, res) => {
        try {
          await Users.findOneAndUpdate({key:req.body.key},{name:"anshT"});
          res.status(200).send(); 
        } catch (e) {
          console.error(e);
          res.status(500).send({ error: 'Internal Server Error' });
        }
      });
      } catch (error) {
          console.log(error)
      }
      app.delete('/api/user/remove',async (req,res) => {
        try {
          await Users.findOneAndDelete({key:req.body.key})
          res.status(200)
        } catch (e) {
          console.log(e)
          res.status(500).send({ error: 'Internal Server Error' });
        }
      })
}
main()
