const express = require('express');
const mongoose = require('mongoose');
// const testRouter = require('.routes/TestRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/test", testRouter);

app.use('/', (req, res) => {
  res.send('Hello World from the Node.js backend!');
});

const uri = `mongodb+srv://${process.env.DB_USER}:` +
            `${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/` +
            `?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

try {
  mongoose.connect(uri);
} catch (error) {
  console.log(error);
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;

// let db;
// let dbReady = false;

// MongoClient.connect(uri, (err, client) => {
//     if (err) {
//         console.error('Error connecting to MongoDB', err);
//         return;
//     }
//     db = client.db(process.env.DB_NAME);
//     console.log('Connected to MongoDB');
//     dbReady = true;
// });

// app.get('/', (req, res) => {
//   res.send('Hello World from the Node.js backend!');
// });

// app.get('/test', async (req, res) => {
//   if (!dbReady) {
//     return res.status(503).send('Database not ready');
//   }
//   try {
//     const collection = db.collection(process.env.DB_COLLECTION);
//     const data = await collection.find({}).toArray();
//     res.send(data);
//   } catch (error) {
//     console.error('Error accessing the database', error);
//     res.status(500).send('Failed to fetch data');
//   }
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });
