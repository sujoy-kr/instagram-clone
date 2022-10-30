const router = require('express').Router()
const postController = require('../../controllers/postController')
const {multerMiddleware} = require('../../utils/multer')

router.get('/', postController.getAllPosts)
router.post('/', multerMiddleware, postController.createPost)

module.exports = router
