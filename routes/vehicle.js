const router = require('express').Router()
const VehicleController = require('../controllers/vehicle')

router.get('/', VehicleController.getAllVehicles)

router.get('/view/:vehicle_id', VehicleController.getSingleVehiclePage)

router.get('/new', VehicleController.createVehiclePage)

router.post('/new', VehicleController.createVehicle)

router.get('/remove/:vehicle_id', VehicleController.removeVehicle)

module.exports = router