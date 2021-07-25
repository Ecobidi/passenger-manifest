const ManifestService = require('../services/manifest')
const DriverService = require('../services/driver')
const VehicleService = require('../services/vehicle')

class ManifestController {

  static async getAllManifests(req, res) {
    let manifests
    if (req.query.search && req.query.search.length > 1) {
      manifests = await ManifestService.findByVehicleNumber(req.query.search) 
    } else {
      manifests = await ManifestService.findAll()
    }
    res.render('manifests', { manifests})
  }

  // static async getSingleDriverPage(req, res) {
  //   let driver = await ManifestService.findById(req.params.driver_id)
  //   if (!driver) {
  //     req.flash('error_msg', 'ID does not match any driver')
  //     return res.redirect('/drivers')
  //   }
  //   res.render('driver-info', {driver})
  // }

  static async createManifestPage(req, res) {
    let drivers = await DriverService.findAll()
    let vehicles = await VehicleService.findAll()
    res.render('manifests-new', { edit: false, drivers, vehicles })
  }

  static async createManifest(req, res) {
    let dao = req.body
    try {
      let driver = await DriverService.findById(dao.driver)
      let vehicle = await VehicleService.findById(dao.vehicle)
      // if (!driver || !vehicle) console.log('Invalid driver_id or vehicle_id')
      if (!driver || !vehicle) throw new Error('Invalid driver_id or vehicle_id')
      dao.driver_name = driver.fullname
      dao.vehicle_number = vehicle.vehicle_number
      // console.log(dao)
      await ManifestService.save(dao)
      req.flash('success_msg', 'Manifest created')
      res.redirect('/manifests')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error creating manifest')
      res.redirect('/manifests')
    }
  }

  static async updateManifestStatus(req, res) {
    try {
      let manifest = await ManifestService.findById(req.params.manifest_id)
      if (!manifest) {
        req.flash('error_msg', 'No Manifest Found With Such ID')
        return res.redirect('/manifests')
      } 
      manifest.status = req.query.status
      manifest.is_complete = req.query.status ==  'complete' ? true : false
      await manifest.save()
      req.flash('success_msg', 'Success: Manifest status updated')
      res.redirect('/manifests')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/manifests')
    }
  }

  static async removeManifest(req, res) {
    try {
      await ManifestService.removeOne(req.params.manifest_id)
      res.redirect('/manifests')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/manifests')
    }
  }

}

module.exports = ManifestController