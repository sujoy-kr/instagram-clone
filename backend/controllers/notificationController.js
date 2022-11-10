const {notification: Notification} = require('../models')

const getNotifications = async (req, res) => {
    try {
        const {user_id} = req.user
        const notification = await Notification.findOne({
            where: {user_id},
        })

        if (!notification) {
            return res.status(200).json([])
        }

        const notifications = notification.notifications
        // invert the array to show the latest notification first
        notifications.reverse()
        res.status(200).json(notifications)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

module.exports = {
    getNotifications
}