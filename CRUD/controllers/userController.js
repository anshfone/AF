import Users from "../models/userModel.js";

const UserController = {
    async getUsers(req,res) {
        try {
            const users = await Users.find({});
            res.json(users); 
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        },
    async saveUser(req,res) {
        try {
            const newUser = new Users({name: req.body.name, key: req.body.key})
            await newUser.save()
            res.sendStatus(200)
        } catch (error) {
          console.log(error)
          res.status(500)
        }
      },
    async editUser(req,res) {
      try {
        await Users.findOneAndUpdate({key:req.body.key},{name:req.body.name});
        res.status(200).send(); 
      } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    },
    async deleteUser(req,res) {
      try {
        await Users.findOneAndDelete({key:req.body.key})
        res.status(200)
        } catch (e) {
        console.log(e)
        res.status(500).send({ error: 'Internal Server Error !' });
      }
    }
}

export default UserController