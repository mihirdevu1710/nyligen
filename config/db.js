// config/db.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Replace 'process.env.MONGODB_URI' with your MongoDB connection string
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
