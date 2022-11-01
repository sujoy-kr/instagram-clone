const router = require('express').Router()
const postController = require('../../controllers/postController')
const {multerMiddleware} = require('../../middlewares/multer')
const auth = require('../../middlewares/auth')

router.get('/', postController.getAllPosts)
router.post('/', auth.required, multerMiddleware, postController.createPost)

module.exports = router
