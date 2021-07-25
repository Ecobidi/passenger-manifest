const mongoose = require('mongoose')

const PassengerSchema = new mongoose.Schema({
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
  next_of_kin_name: {
    type: String,
  },
  next_of_kin_contact: {
    type: String,
  },
  manifest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'manifest'
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('passenger', PassengerSchema)