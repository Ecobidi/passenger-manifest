const ManifestModel = require('../models/manifest')

class ManifestService {
  
  static async findByDriverName(name) {
    let pattern = new RegExp(name, 'ig')
    return ManifestModel.find({ driver_name: pattern }).populate('driver vehicle').sort('-_id').exec()
  }

  static async findByVehicleNumber(vehicle_number) {
    return ManifestModel.find({vehicle_number: new RegExp(vehicle_number, 'ig')}).populate('driver vehicle').sort('-_id').exec()
  }

  static async findById(id) {
    return ManifestModel.findById(id).populate('driver vehicle').sort('-_id').exec()
  }
  
  static async findAll() {
    return ManifestModel.find({}).populate('driver vehicle').sort('-_id').exec()
  }

  static async save(dao) {
    return ManifestModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return ManifestModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return ManifestModel.findByIdAndRemove(id)
  }

}

module.exports = ManifestService