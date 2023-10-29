import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    id: Number,
    creator: String,  
    title: String
})
const Posts = model('Posts', postSchema,"Posts");

export default Posts
