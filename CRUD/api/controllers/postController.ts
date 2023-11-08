import dotenv from 'dotenv';
import escapeStringRegexp from 'escape-string-regexp';
import { Request,Response } from "express";
import Posts from '../models/postModel.ts';
import Users from '../models/userModel.ts';
import { Post } from '../interfaces/PostInterface.ts';
import mongoose from 'mongoose'
import { gfs, gridfsBucket } from '../database/mongoConfig.ts'
import { faker } from '@faker-js/faker';
import { generateMockPosts } from '../utils/generateMockData.ts';
dotenv.config();

interface SearchQuery {
    toBeSearched: string,
    skip: number,
    limit: number
}

const postController = {
    async getPosts(req: Request, res: Response): Promise<void> {
        const skip = parseInt(req.query.skip as string, 10); 
        const limit = parseInt(req.query.limit as string, 10); 
        const posts: any = await Posts.find({}).skip(skip).limit(limit).sort({createdAt: -1})
        const totalPostsCount = await Posts.countDocuments({})
        res.send({
            status: 200,
            message: "All Posts Fetched",
            posts,
            totalPosts: totalPostsCount
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
        const { toBeSearched, skip, limit } = req.query as Record<string, string>;
        const skipAsNumber = parseInt(skip, 10);
        const limitAsNumber = parseInt(limit, 10);
        const escapedToBeSearched = escapeStringRegexp(toBeSearched);
        const pipeline = [
            {
                $match: {
                    $or: [
                        { title: { $regex: escapedToBeSearched, $options: 'i' } },
                        { content: { $regex: escapedToBeSearched, $options: 'i' } },
                        { creator: { $regex: escapedToBeSearched, $options: 'i'} }
                    ]
                }
            },
            {
                $skip: skipAsNumber
            },
            {
                $limit: limitAsNumber
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
    async generateMockData(req: Request, res: Response): Promise<void> {
        const count: number = +req.query.count
        for (let i = 0; i < count; i++) {
            const post: any = new Posts(generateMockPosts());
            await post.save();
        }
        res.send(`Created ${count} posts`)
    },
    async deletePost(req: Request, res: Response): Promise<void> {
        await Posts.deleteMany({})
        res.send("Posts Deleted")
    }
}
export default postController