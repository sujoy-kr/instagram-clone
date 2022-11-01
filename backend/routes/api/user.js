const router = require('express').Router()
const userController = require('../../controllers/userController')
const auth = require('../../middlewares/auth')

router.get('/', userController.getAllUser)
router.post('/', userController.postUser)
router.post('/login', userController.loginUser)
router.get('/:username', userController.getUserByUsername)
router.get('/:username/follow', auth.required, userController.followToggle)

module.exports = router
