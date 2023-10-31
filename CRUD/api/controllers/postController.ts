import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
import { Request,Response } from "express";
import Posts from '../models/postModel.ts';
import Users from '../models/userModel.ts';
dotenv.config();

const postController = {
    async getPosts(req: Request, res: Response): Promise<void> {
        const userData = req.body
        const posts = await Posts.find({creatorEmail: userData.creatorEmail})
        res.json(posts)
    },
    async createPost(req: Request, res: Response): Promise<void> {
        try{
            const user = await Users.findOne({email: req.body.creatorEmail})
            const newPost = new Posts({creator: user.username,...req.body})
            await newPost.save()
            res.send({
                status: 200,
                message: "Post Created"
            })
        } catch (e) {
            console.log(e)
        }
    },
    async deletePost(req: Request, res: Response): Promise<void> {
        await Posts.deleteMany({})
        res.send("Posts Deleted")
    }
}

export default postController