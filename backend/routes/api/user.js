const router = require('express').Router()
const userController = require('../../controllers/userController')
const auth = require('../../middlewares/auth')
const {multerMiddleware} = require('../../middlewares/multer')

router.get('/', userController.getAllUser)
router.post('/', userController.postUser)
router.get('/lastten', auth.required, userController.getLastTenUsers)
router.get('/search/:keyword', auth.required, userController.getSearchedUsers)
router.put('/:username', auth.required, multerMiddleware, userController.updateUser)
router.post('/login', userController.loginUser)
router.get('/:username', userController.getUserByUsername)
router.get('/:username/follow', auth.required, userController.followToggle)

module.exports = router
