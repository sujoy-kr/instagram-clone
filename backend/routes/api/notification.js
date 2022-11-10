const router = require('express').Router()
const notificationController = require('../../controllers/notificationController')
const auth = require('../../middlewares/auth')

router.get('/', auth.required, notificationController.getNotifications)

module.exports = router
