import { Schema, Types, model } from 'mongoose';

const postSchema = new Schema({
    creatorEmail: String,
    creator: String,  
    title: String,
    content: String,
    imageId: Types.ObjectId
}, {
    timestamps: true
})
const Posts = model('Posts', postSchema,"Posts");

export default Posts
