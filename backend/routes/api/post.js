const router = require('express').Router()
const postController = require('../../controllers/postController')
const {multerMiddleware} = require('../../middlewares/multer')
const auth = require('../../middlewares/auth')

router.get('/', postController.getAllPosts)
router.post('/', auth.required, multerMiddleware, postController.createPost)
router.get('/feed', auth.required, postController.getFeed)
// toggles like on a post
router.get('/:id/like', auth.required, postController.toggleLike)

module.exports = router
