const router = require('express').Router()
const PassengerController = require('../controllers/passenger')

router.get('/', PassengerController.getAllPassengers)

// router.get('/view/:driver_id', PassengerController.getSingleDriverPage)

// router.get('/edit/:driver_id', PassengerController.updateDriverPage)

// router.post('/edit/:driver_id', PassengerController)

router.get('/new', PassengerController.createPassengerPage)

router.post('/new', PassengerController.createPassenger)

router.get('/remove/:passenger_id', PassengerController.removePassenger)

module.exports = router