const router = require('express').Router()
const postController = require('../../controllers/postController')
const {multerMiddleware} = require('../../utils/multer')
const auth = require('../../utils/auth')

router.get('/', postController.getAllPosts)
router.post('/', auth.required, multerMiddleware, postController.createPost)

module.exports = router
