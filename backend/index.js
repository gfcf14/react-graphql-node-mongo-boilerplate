const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const testRouter = require('./routes/testRoutes');
const connectToDb = require('./configs/db.config');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: '*' }));

const log = (args) => {
  console.log(args);
};


app.get('/', (req, res) => {
  res.send('Hello from the NodeJS backend!');
});

app.use('/test', testRouter.getUsers);

async function startServer() {
  const port = process.env.PORT || 5000;
  app.listen({ port }, () =>
    log(`🚀 Server ready at http://localhost:${port}`)
  );
  connectToDb();
}

startServer();