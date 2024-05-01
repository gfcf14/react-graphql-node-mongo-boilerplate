const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World from the Node.js backend!');
});

app.get('/test', (req, res) => {
  res.send('And the Backend too!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});