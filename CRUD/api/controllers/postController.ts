import dotenv from 'dotenv';
import escapeStringRegexp from 'escape-string-regexp';
import { Request,Response } from "express";
import Posts from '../models/postModel.ts';
import Users from '../models/userModel.ts';
import { Post } from '../interfaces/PostInterface.ts';
import { ReadStream } from 'fs'
import mongoose from 'mongoose'
import { gfs, gridfsBucket } from '../database/mongoConfig.ts'
dotenv.config();

const postController = {
    async getPosts(req: Request, res: Response): Promise<void> {
        const userData = req.body
        const posts: any = await Posts.find({creatorEmail: userData.creatorEmail}).sort({createdAt: -1})
        res.send({
            status: 200,
            message: "All Posts Fetched",
            posts
        })
    },
    async getImage(req: Request, res: Response): Promise<void> {
        try{
            const id = new mongoose.Types.ObjectId(req.params.imageId)
            const image = await gfs.files.findOne({_id: id})
            if (image.contentType === "image/jpeg" || image.contentType === 'image/png') {
                const readStream = gridfsBucket.openDownloadStream(image._id)
                readStream.pipe(res)
            }
        } catch(err) {
            console.log(err)
        }
    },
    async createPost(req: Request, res: Response): Promise<void> {
        try{
            const user: any = await Users.findOne({email: req.body.creatorEmail})
            const newPost: any = new Posts({creator: user.username,...req.body,imageId: req.file?.id}) 
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
                    imageId: 1,
                }
            },
        ];
        const searchedPosts: Post[] = await Posts.aggregate(pipeline).exec();
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