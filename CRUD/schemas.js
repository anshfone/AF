import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  key: Number,  
  name: String
})
const Users = model('Users', userSchema,"Users");

export { Users };
