const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
  vehicle_number: { // vehicle_identification_number
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  engine_no: String,
  color: String,
  // vehicle_model: String,
  vehicle_plate_number: {
    type: String,
  },
  vehicle_type: {
    type: String,
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('vehicle', VehicleSchema)