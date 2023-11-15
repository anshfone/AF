import { Schema, Types, model } from 'mongoose';

const userSchema = new Schema({  
  username: String,
  email: String,
  password: String,
  profile: Types.ObjectId
})
const Users = model('Users', userSchema,"Users");

export default Users
