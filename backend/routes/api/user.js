const router = require('express').Router()
const userController = require('../../controllers/userController')
const auth = require('../../middlewares/auth')
const {multerMiddleware} = require('../../middlewares/multer')

router.get('/', userController.getAllUser)
router.post('/', userController.postUser)
router.post('/login', userController.loginUser)
router.get('/lastten', auth.required, userController.getLastTenUsers)
router.get('/search/:keyword', auth.required, userController.getSearchedUsers)
router.put('/:username', auth.required, multerMiddleware, userController.updateUser)
router.get('/:username', userController.getUserByUsername)
router.get('/:username/follow', auth.required, userController.followToggle)
router.get('/:username/followings', auth.required, userController.getFollowings)
router.get('/:username/followers', auth.required, userController.getFollowers)

module.exports = router
