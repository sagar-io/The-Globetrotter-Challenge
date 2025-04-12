import { MongoClient } from 'mongodb';

const dbConnectionString = process.env.MONGO_URI;
if (!dbConnectionString) {
  throw new Error('Please add the connection string to environment variables');
}

const options = {};
let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(dbConnectionString, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(dbConnectionString, options);
  clientPromise = client.connect();
}

export default clientPromise;