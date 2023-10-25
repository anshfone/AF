import { connect } from 'mongoose';

const username = encodeURIComponent("anshTyagi");
const password = encodeURIComponent("Ansh2222##");

let db;

export default async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    await connect(`mongodb+srv://${username}:${password}@cluster0.dhuquz9.mongodb.net/DBR`);
    console.log('Connected to the database!');
  } catch (e) {
    console.error('Connection failed!', e);
    throw e;
  }
}

