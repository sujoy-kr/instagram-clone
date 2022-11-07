const router = require('express').Router()
const messageController = require('../../controllers/messageController')
const auth = require('../../middlewares/auth')

router.get('/', auth.required, messageController.getAllMessage)
// returns the users in from messages
router.get('/inbox', auth.required, messageController.getInbox)
// the :username is receiver's username. Sender's username will be included with jwt.
router.get('/:username', auth.required, messageController.getMessage)

module.exports = router
