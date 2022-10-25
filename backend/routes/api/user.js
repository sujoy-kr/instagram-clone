const router = require('express').Router()
const userController = require('../../controllers/userController')

router.get('/', userController.getAllUser)
router.post('/', userController.postUser)
router.post('/login', userController.loginUser)

module.exports = router
