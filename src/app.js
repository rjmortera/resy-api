require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const m = require('./middle');
const api = require('./api');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(404).json({
      message: 'hi from Krev!'
    });
  });

app.use('/api/v1', api);
app.use(m.brokenPage);

module.exports = app;
