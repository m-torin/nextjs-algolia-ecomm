const express = require('express');

const router = express.Router();

router.use('/algolia', require('./algolia'));

module.exports = router;
