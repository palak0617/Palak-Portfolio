/**
 * MongoDB connection helper — safe for Next.js serverless API routes.
 * Uses a cached client so we don't create a new connection on every request.
 *
 * Setup:
 *   1. Add MONGODB_URI to .env.local
 *      Example: mongodb+srv://user:pass@cluster.mongodb.net/palak_portfolio
 *   2. Messages are saved to the "messages" collection inside your database.
 *   3. View them in MongoDB Atlas  →  Browse Collections  →  messages
 */

import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI ?? '';

if (!uri) {
  console.warn(
    '[MongoDB] MONGODB_URI not set. Messages will fall back to email. ' +
    'Add MONGODB_URI to .env.local to enable database storage.'
  );
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, reuse the connection across hot-reloads
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export const DB_NAME = process.env.MONGODB_DB ?? 'palak_portfolio';
