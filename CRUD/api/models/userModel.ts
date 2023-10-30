import { Schema, model } from 'mongoose';

const userSchema = new Schema({  
  username: String,
  email: String,
  password: String
})
const Users = model('Users', userSchema,"Users");

export default Users
