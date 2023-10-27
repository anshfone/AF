import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
import { Request,Response } from "express";
import Posts from '../models/postModel.ts';
dotenv.config();

const postController = {
    async getPosts(req: Request, res: Response): Promise<void> {
        const userData = req.body
        const posts = await Posts.find({creator: userData.email})
        res.json(posts)
    },
    async createPost(req: Request, res: Response): Promise<void> {
        try{
            const newPost = new Posts({creator: req.body.email,title: req.body.title})
            await newPost.save()
            res.send("Post Created")
        } catch (e) {
            console.log(e)
        }
    }
}

export default postController