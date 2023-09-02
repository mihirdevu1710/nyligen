// controllers/userController.js
const User = require('../models/User');
const DeviceSchema = require('../models/DeviceDetails');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// User Registration
exports.registerUser = async (req, res) => {
  const { firstName, lastName, mobileNumber, aadharCardNumber, address, deviceId, deviceDetails, email, role = 'user'} = req.body;
  try {
    const userExists = await User.count({ email, mobileNumber });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const newUser = await User.create({ firstName, lastName, email, mobileNumber, aadharCardNumber, address, deviceId,otp:123456 });

    if (!_.isEmpty(deviceDetails)) {
      await deviceDetails.map(async (device) => {
        if (device.switchDetails) {
          await device.switchDetails.map(async (i) => {
            const newDevice = await DeviceSchema.create({
              deviceType: device.deviceType,
              deviceId: i.id,
              title: i.title,
              onOf: i.onoff, // Make sure 'onoff' is defined or replace it with the correct value
              userId: newUser.id,
              serialNumber: deviceId,
            });
          });
        }
      });
    }
    res.json({ message: 'User registered successfully!', user: { email } });

  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  const { mobileNumber,otp } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
    }
    if (!otp) {
      return res.status(401).json({ error: 'OTP is Empty. Please try again.' });
    }
    if(user.otp !==otp){
      return res.status(401).json({ error: 'Please enter valid OPT. Please try again.' });
    }
    // Create and send JWT token
    const token = jwt.sign({ userId: user._id, mobileNumber: user.mobileNumber, role: user.role,name:`${user.firstName, user.lastName} ` }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful!', user: { firstName: user.firstName, lastName:user.lastName ,role:user.role }, token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
