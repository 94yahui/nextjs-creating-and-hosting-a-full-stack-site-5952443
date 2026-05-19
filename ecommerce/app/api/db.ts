import { MongoClient, ServerApiVersion, Db } from "mongodb";
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.7ylduwm.mongodb.net/?appName=Cluster0`;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    cachedClient = client;
    cachedDb = client.db('ecommerce-nextjs');

    return { client, db: client.db('ecommerce-nextjs') };
  }

