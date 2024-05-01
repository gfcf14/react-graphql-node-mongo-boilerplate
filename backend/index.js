const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:` +
            `${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/` +
            `?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

let db;

async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(process.env.DB_NAME);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
}

app.get('/', (req, res) => {
  res.send('Hello World from the Node.js backend!');
});

app.get('/test', async (req, res) => {
  try {
    const collection = db.collection(process.env.DB_COLLECTION);
    const data = await collection.find({}).toArray();
    res.send(data);
  } catch (error) {
    console.error('Error accessing the database', error);
    res.status(500).send('Failed to fetch data');
  }
});

async function startServer() {
  await connectToDatabase();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();