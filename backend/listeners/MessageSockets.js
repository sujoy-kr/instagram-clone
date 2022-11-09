const {message: Message, user: User} = require('../models')
const messageSockets = (socket, io) => {
    socket.on('message', async (data) => {
        const {senderUsername, receiverUsername, message} = data
        if ((senderUsername && receiverUsername && message) && (senderUsername !== receiverUsername)) {
            const senderUser = await User.findOne({where: {username: senderUsername}})
            const receiverUser = await User.findOne({where: {username: receiverUsername}})

            if (senderUser && receiverUser) {
                const messageToSent = {
                    senderUsername: senderUser.username,
                    receiverUsername: receiverUser.username,
                    message
                }

                const existingChat = await senderUser.messages.find((chat) => {
                    return chat.with === receiverUser.username
                })

                if (existingChat) {
                    const message = await Message.findOne({where: {message_id: existingChat.message_id}})
                    message.messages = [...message.messages, messageToSent]
                    await message.save()
                    io.to(receiverUsername).emit('message', messageToSent)
                } else {
                    const message = await Message.create({
                        messages: [messageToSent],
                        user_ids: [senderUser.user_id, receiverUser.user_id]
                    })
                    senderUser.messages = [...senderUser.messages, {
                        with: receiverUser.username,
                        message_id: message.message_id
                    }]
                    receiverUser.messages = [...receiverUser.messages, {
                        with: senderUser.username,
                        message_id: message.message_id
                    }]
                    await senderUser.save()
                    await receiverUser.save()
                    io.to(receiverUsername).emit('message', messageToSent)
                }

            }
        }
    })
}

module.exports = messageSockets