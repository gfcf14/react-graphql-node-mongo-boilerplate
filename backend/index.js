const express = require('express');
const connectToDb = require('./configs/db.config');
const cors = require('cors');
const path = require('path');
const testRouter = require('./routes/testRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/test', testRouter.getUsers);

let db;

connectToDb()
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { db };