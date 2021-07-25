const VehicleService = require('../services/vehicle')
const VehicleModel = require('../models/vehicle')
const DriverService = require('../services/driver')

class VehicleController {

  static async getAllVehicles(req, res) {
    let vehicles
    if (req.query.search && req.query.search.length > 0) {
      vehicles = await VehicleService.findByVehicleNumber(req.query.search)
    } else {
      vehicles = await VehicleService.findAll()
    }
    res.render('vehicles', { vehicles })
  }

  static async getSingleVehiclePage(req, res) {
    let vehicle = await VehicleService.findById(req.params.vehicle_id)
    if (!vehicle) {
      req.flash('error_msg', 'ID does not match any vehicle')
      return res.redirect('/vehicles')
    }
    res.render('vehicle-info', {vehicle})
  }

  static async createVehiclePage(req, res) {
    let vehicle = new VehicleModel()
    res.render('vehicles-edit', { vehicle, edit: false })
  }

  static async createVehicle(req, res) {
    let dao = req.body
    try {
      let vehicle = await VehicleService.findByVehicleNumber(dao.vehicle_number)
      if (vehicle) {
        const error_msg = 'Error: This vehicle number is already assigned to another vehicle.'
        return res.render('vehicles-edit', { vehicle: new VehicleModel(dao), error_msg, edit: false })
      }
      await VehicleService.save(dao)
      req.flash('success_msg', 'Vehicle Information Created')
      res.redirect('/vehicles')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error add vehicle information')
      res.redirect('/vehicles')
    }
  }

  static async updateVehiclePage(req, res) {
    try {
      let vehicle = await VehicleService.findById(req.params.vehicle_id)
      if (!vehicle) {
        req.flash('error_msg', 'No vehicle found')
        return res.redirect('/vehicles')
      } 
      res.render('vehicles-edit', { vehicle, edit: true })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/vehicles')
    }
  }

  static async removeVehicle(req, res) {
    try {
      await VehicleService.removeOne(req.params.vehicle_id)
      res.redirect('/vehicles')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/vehicles')
    }
  }

}

module.exports = VehicleController