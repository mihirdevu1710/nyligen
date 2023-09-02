const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  aadharCardNumber: { type: String,allowNull: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['user', 'subUser', 'admin', 'superAdmin'], default: 'user' },
  otp:{type: Number},
}, {
  timestamps: true // Enable timestamps
});

const User = mongoose.model('User', userSchema);

module.exports = User;
