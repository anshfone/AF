import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);

let db;

export default async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await connect(`mongodb+srv://${username}:${password}@cluster0.dhuquz9.mongodb.net/DBR`);
    console.log('Connected to the database!');
  } catch (e) {
    console.error('Connection failed', e);
    throw e;
  }
}

