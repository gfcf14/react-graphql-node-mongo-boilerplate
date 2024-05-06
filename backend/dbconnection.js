require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const uri = `mongodb+srv://${process.env.DB_USER}:` +
            `${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/` +
            `?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(uri);

const db = mongoose.connection;
db.once('open', (_) => {
  console.log('Database connected');
});

db.on('error', (err) => {
  console.error('connection error: ', err);
});