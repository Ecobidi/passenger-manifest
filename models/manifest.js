const mongoose = require('mongoose')

const ManifestSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'driver',
  },
  driver_name: String,
  // passengers: [ { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'passenger'
  // }],
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'vehicle',
  },
  vehicle_number: String,
  departure_date: {
    type: Date,
  },
  departure_time: {
    type: String,
  },
  from: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['in-progress', 'complete', 'cancelled'],
    default: 'in-progress',
  },
  is_complete: {
    type: Boolean,
    default: false,
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: false}})

module.exports = mongoose.model('manifest', ManifestSchema)