import { Types } from "mongoose";

export interface Post {
    creatorEmail: String,
    creator: String,  
    title: String,
    content: String,
    imageId: Types.ObjectId
}