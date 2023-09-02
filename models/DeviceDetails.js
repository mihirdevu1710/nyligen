// models/DeviceDetails.js
const mongoose = require('mongoose');
const deviceSchema = new mongoose.Schema({
  deviceType: { type: String, required: true },
  deviceId: { type: String, required: true},
  title:{type:String,allowNull: true},
  serialNumber: { type: String, required: true},
  onOf: { type: Boolean ,default:0},
  userId:{type: String, required: true}
}, {
  timestamps: true // Enable timestamps
});

const DeviceSchema = mongoose.model('DeviceDetails', deviceSchema);

module.exports = DeviceSchema;
