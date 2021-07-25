const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
  driver_license_no: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: String,
  last_name: {
    type: String,
    required: true,
  },
  fullname: String,
  blood_group: String,
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('driver', DriverSchema)