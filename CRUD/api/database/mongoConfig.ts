import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { MongoClient, GridFSBucket } from 'mongodb';

dotenv.config();

const username: string | undefined = encodeURIComponent(process.env.DB_USERNAME);
const password: string | undefined = encodeURIComponent(process.env.DB_PASSWORD);

export default async function connectToDatabase(): Promise<any> {
  try {
    const uri = `mongodb+srv://${username}:${password}@cluster0.dhuquz9.mongodb.net/DBR`
    const client = new MongoClient(uri)
    //await client.connect()
    await connect(`mongodb+srv://${username}:${password}@cluster0.dhuquz9.mongodb.net/DBR`);
    const db = client.db("DBR")
    const bucket = new GridFSBucket(db)
    console.log('Connected to the database!');
    return bucket
  } catch (e) {
    console.error('Connection failed', e);
    throw e;
  }
}

