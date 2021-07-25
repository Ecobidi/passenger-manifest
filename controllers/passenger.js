const PassengerService = require('../services/passenger')
const ManifestService = require('../services/manifest')

class PassengerController {

  static async getAllPassengers(req, res) {
    let passengers
    if (req.query.search && req.query.search.length > 1) {
      passengers = await PassengerService.findByName(req.query.search) 
    } else {
      passengers = await PassengerService.findAll()
    }
    res.render('passengers', { passengers})
  }

  // static async getSingleDriverPage(req, res) {
  //   let driver = await PassengerService.findById(req.params.driver_id)
  //   if (!driver) {
  //     req.flash('error_msg', 'ID does not match any driver')
  //     return res.redirect('/drivers')
  //   }
  //   res.render('driver-info', {driver})
  // }

  static async createPassengerPage(req, res) {
    let manifests = await ManifestService.findAll()
    res.render('passengers-new', { edit: false, manifests })
  }

  static async createPassenger(req, res) {
    let dao = req.body
    dao.fullname = `${dao.last_name} ${dao.first_name} ${dao.middle_name}`
    try {
      await PassengerService.save(dao)
      req.flash('success_msg', 'Passenger added to manifest')
      res.redirect('/passengers')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error adding passenger to manifest')
      res.redirect('/passengers')
    }
  }

  // static async updateDriverPage(req, res) {
  //   try {
  //     let driver = await PassengerService.findById(req.params.driver_id)
  //     if (!driver) {
  //       req.flash('error_msg', 'No Driver Found With Such ID')
  //       return res.redirect('/drivers')
  //     } 
  //     res.render('drivers-edit', { driver, edit: true })
  //   } catch (error) {
  //     console.log(error)
  //     req.flash('error_msg', 'An Error Occurred')
  //     res.redirect('/drivers')
  //   }
  // }

  static async removePassenger(req, res) {
    try {
      await PassengerService.removeOne(req.params.passenger_id)
      res.redirect('/passengers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/passengers')
    }
  }

}

module.exports = PassengerController