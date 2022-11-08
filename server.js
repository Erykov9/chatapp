const express = require('express');
const app = express();
const path = require('path');

const messages = []

app.use(express.static(path.join(__dirname, '/client')));

app.use('/client', (req, res) => {
  res.sendFile(__dirname, '/client/index.html')
})

app.use((req, res) => {
  res.status(404).send({message: 'NOT FOUND 404'});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});