import Users from "../models/userModel.ts";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
import { Request,Response } from "express";
dotenv.config();

const UserController = {

    async loginUser(req: Request, res: Response): Promise<void> {
      const userData = req.body;
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const expiresIn = '1m';
      const token = jwt.sign(userData, jwtSecretKey, { expiresIn });
      res.send(token);
    },
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await Users.find({});
            res.json(users); 
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        },
    async saveUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = new Users({name: req.body.name, key: req.body.key});
            await newUser.save();
            res.sendStatus(200);
        } catch (error) {
          console.log(error);
          res.status(500);
        }
      },
    async editUser(req: Request, res: Response): Promise<void> {
      try {
        await Users.findOneAndUpdate({key:req.body.key},{name:req.body.name});
        res.status(200); 
      } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    },
    async deleteUser(req: Request, res: Response): Promise<void> {
      try {
        await Users.findOneAndDelete({key:req.body.key});
        res.status(200);
        } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Internal Server Error !' });
      }
    }
}

export default UserController;