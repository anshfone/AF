import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    creator: String,  
    title: String
})
const Posts = model('Posts', postSchema,"Posts");

export default Posts
