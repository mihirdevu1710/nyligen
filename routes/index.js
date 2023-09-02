// routes/index.js
const express = require('express');
const router = express.Router();

// Index Route
router.get('/', (req, res) => {
  res.render('index', { title: 'E-commerce Website' });
});

module.exports = router;
