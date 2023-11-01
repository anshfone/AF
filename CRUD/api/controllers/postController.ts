import dotenv from 'dotenv';
import escapeStringRegexp from 'escape-string-regexp';
import { Request,Response } from "express";
import Posts from '../models/postModel.ts';
import Users from '../models/userModel.ts';
dotenv.config();

const postController = {
    async getPosts(req: Request, res: Response): Promise<void> {
        const userData = req.body
        const posts = await Posts.find({creatorEmail: userData.creatorEmail}).sort({createdAt: -1})
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
    async searchPosts(req: Request, res: Response): Promise<void> {
        const {toBeSearched} = req.body
        const escapedToBeSearched = escapeStringRegexp(toBeSearched);
        const pipeline = [
            {
                $match: {
                    $or: [
                        { title: { $regex: escapedToBeSearched, $options: 'i' } },
                        { content: { $regex: escapedToBeSearched, $options: 'i' } }
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    content: 1,
                    creator: 1,
                }
            },
        ];
        const searchedPosts = await Posts.aggregate(pipeline).exec();
        res.send({
            status: 200,
            data: searchedPosts
        })
    },
    async deletePost(req: Request, res: Response): Promise<void> {
        await Posts.deleteMany({})
        res.send("Posts Deleted")
    }
}
export default postController