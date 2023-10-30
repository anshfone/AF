import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    id: Number,
    creatorEmail: String,
    creator: String,  
    title: String,
    content: String
})
const Posts = model('Posts', postSchema,"Posts");

export default Posts
