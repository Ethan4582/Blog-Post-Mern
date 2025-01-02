const { MongoClient, ServerApiVersion } = require('mongodb');


require('dotenv').config({ path: './config.env' });


const url = process.env.ALTAS_URL;

if (!url || !url.startsWith('mongodb')) {
  throw new Error("Invalid or missing ALTAS_URL environment variable");
}

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect();
      database = client.db("Mern-flow-blog-data");
      console.log("Successfully connected to database");
    } catch (err) {
      console.error("Error connecting to database:", err);
    }
  },
  getDb: () => {
    return database;
  }
};
