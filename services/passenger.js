const PassengerModel = require('../models/passenger')

class PassengerService {
  
  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return PassengerModel.find({ fullname: pattern }).populate('manifest')
  }

  static async findByManifestId(manifest) {
    return PassengerModel.find({ manifest }).populate('manifest')
  }

  static async findById(id) {
    return PassengerModel.findById(id).populate('manifest')
  }
  
  static async findAll() {
    return PassengerModel.find().populate('manifest')
  }

  static async save(dao) {
    return PassengerModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return PassengerModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return PassengerModel.findByIdAndRemove(id)
  }

}

module.exports = PassengerService