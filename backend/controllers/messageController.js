const {message: Message, user: User} = require('../models')

const getAllMessage = async (req, res) => {
    const messages = await Message.findAll({})
    res.status(200).json(messages)
}

const getMessage = async (req, res) => {
    try {
        const {username: senderUsername} = req.user
        const receiverUsername = req.params.username

        const sender = await User.findOne({where: {username: senderUsername}})
        const receiver = await User.findOne({where: {username: receiverUsername}})

        if (sender && receiver) {
            const checkExistingMessage = sender.messages.find(message => message.with === receiver.username)
            if (checkExistingMessage) {
                const message = await Message.findOne({where: {message_id: checkExistingMessage.message_id}})
                res.status(200).json(message.messages)
            } else {
                res.status(200).json([])
            }
        } else {
            res.status(404).json({message: 'User not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getInbox = async (req, res) => {
    try {
        const {username: senderUsername} = req.user
        const sender = await User.findOne({where: {username: senderUsername}})

        if (sender) {

            let inbox = []
            for (let each of sender.messages) {
                const user = await User.findOne({where: {username: each.with}})
                const message = await Message.findOne({where: {message_id: each.message_id}})
                const lastMessage = message.messages[message.messages.length - 1].message
                inbox.push({
                    username: user.username,
                    image: user.image,
                    lastMessage
                })
            }

            res.status(200).json(inbox)

        } else {
            res.status(404).json({message: 'User not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = {
    getAllMessage,
    getMessage,
    getInbox
}