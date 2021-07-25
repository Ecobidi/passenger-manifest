const router = require('express').Router()
const ManifestController = require('../controllers/manifest')

router.get('/', ManifestController.getAllManifests)

router.get('/new', ManifestController.createManifestPage)

router.post('/new', ManifestController.createManifest)

router.get('/remove/:manifest_id', ManifestController.removeManifest)

module.exports = router