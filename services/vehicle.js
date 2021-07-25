const VehicleModel = require('../models/vehicle')

class VehicleService {

  static async findById(id) {
    return VehicleModel.findById(id)
  }

  static async findByVehicleNumber(vehicle_number) {
    return VehicleModel.find({vehicle_number: new RegExp(vehicle_number, 'ig')})
  }

  // static async findByVehicle(query) {
  //   return VehicleModel.find(query)
  // }
  
  static async findAll(query = {}) {
    return VehicleModel.find(query)
  }

  static async save(dao) {
    return VehicleModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return VehicleModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return VehicleModel.findByIdAndRemove(id)
  }

}

module.exports = VehicleService