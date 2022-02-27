const express = require('express');
const resys = require('./resy');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    error: 'nothing to see here :)'
  });
});

router.use('/resy', resys);

module.exports = router;