import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

const username: string = encodeURIComponent(process.env.DB_USERNAME);
const password: string = encodeURIComponent(process.env.DB_PASSWORD);

export default async function connectToDatabase(): Promise<void> {
  try {
    await connect(`mongodb+srv://${username}:${password}@cluster0.dhuquz9.mongodb.net/DBR`);
    console.log('Connected to the database!');
  } catch (e) {
    console.error('Connection failed', e);
    throw e;
  }
}

