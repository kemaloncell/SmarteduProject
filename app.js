const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('index');
});

app.get('/about', (req, res) => {
  res.send('page of about');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port => ${port}`);
});
