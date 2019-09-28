require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const listings = require('./routes/listings');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(`${__dirname}/../dist`)));
app.use('/api/v1/', listings);

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/index.html`), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`express listening at http://localhost:${port}/`);
});
