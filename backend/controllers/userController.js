const {user: User, post: Post, notification: Notification} = require('../models')
const jwt = require('../utils/jwt')
const bcrypt = require('bcrypt')
const config = require('../utils/env_config')
const fs = require('fs')
const {Op} = require('sequelize')

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({})
        res.status(200).json(users)

    } catch (e) {
        res.status(500).json(e.message)
    }
}

const getLastTenUsers = async (req, res) => {
    try {
        const user = req.user
        const lastTen = await User.findAll({
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
            ]
        })
        // remove the current user
        const filtered = lastTen.filter(each => each.user_id !== user.user_id)
        res.status(200).json(filtered)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getUserByUsername = async (req, res) => {
    try {
        const {username} = req.params

        const user = await User.findOne({
            where: {
                username
            }
        })

        if (user) {
            const posts = await Post.findAll({
                where: {
                    user_id: user.user_id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            user.posts = posts
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'user not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const postUser = async (req, res) => {
    try {
        const {username, password, name, email} = req.body

        if (username && password && name && email) {
            const hashedPass = await bcrypt.hash(password, config.SALT_ROUND)
            await User.create({
                username: username,
                password: hashedPass,
                name: name,
                email: email,
            }).then((user) => {
                const jwtUser = {
                    user_id: user.user_id,
                    username: user.username
                }
                const token = jwt.sign(jwtUser)

                res.status(201).json({token, username: user.username, user_id: user.user_id})
            }).catch(err => {
                res.status(500).json({message: err.message})
            })
        } else {
            res.send(400).json({message: 'Username, password, name and email can\'t be empty'})
        }
    } catch {
        res.status(500).json({message: e.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        if (username && password) {
            const user = await User.findOne({
                where: {
                    username
                }
            })

            if (user) {
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    const jwtUser = {
                        user_id: user.user_id,
                        username: user.username
                    }
                    const token = jwt.sign(jwtUser)

                    res.status(200).json({token, username: user.username, user_id: user.user_id})
                } else {
                    res.status(401).json({message: 'wrong password'})
                }
            } else {
                res.status(401).json({message: 'username not found'})
            }
        } else {
            res.status(401).json({message: 'Username or password can\'t be empty'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const followToggle = async (req, res) => {
    try {
        // get the username of the user to follow from url
        const username = req.params.username
        const userToFollow = await User.findOne({
            where: {
                username: username
            }
        })

        //  get the user who requested to follow from the token
        const user = req.user
        const currentUser = await User.findOne({
            where: {
                user_id: user.user_id,
                username: user.username
            }
        })

        // check if the user to follow exists and toggle the following status
        if (userToFollow && currentUser) {
            if (userToFollow.user_id === currentUser.user_id) {
                res.status(400).json({message: 'you can\'t follow yourself'})
            } else {
                // initialize the following array if it doesn't exist
                if (!currentUser.followings) {
                    currentUser.followings = []
                }
                // initialize the followers array if it doesn't exist
                if (!userToFollow.followers) {
                    currentUser.followers = []
                }

                // check if the currentUser is already following userToFollow
                if (currentUser.followings.includes(userToFollow.user_id)) {
                    const currentUserFollowings = currentUser.followings
                    await currentUser.update({
                        followings: currentUserFollowings.filter(following => following !== userToFollow.user_id)
                    })

                    const userToFollowFollowers = userToFollow.followers
                    await userToFollow.update({
                        followers: userToFollowFollowers.filter(follower => follower !== currentUser.user_id)
                    })

                    const userToFollowNotifications = userToFollow.notification_id
                    if (!userToFollowNotifications) {
                        const notification = await Notification.create({
                            user_id: userToFollow.user_id,
                            notifications: [{
                                notification: `${currentUser.username} unfollowed you.`,
                                image: currentUser.image,
                            }]
                        })
                        await userToFollow.update({
                            notification_id: notification.notification_id
                        })

                    } else {
                        const notification = await Notification.findOne({
                            where: {
                                notification_id: userToFollowNotifications
                            }
                        })
                        notification.notifications = [...notification.notifications, {
                            notification: `${currentUser.username} unfollowed you.`,
                            image: currentUser.image,
                        }]
                        await notification.save()
                    }

                    res.status(200).json({message: 'unfollowed'})
                } else {
                    // add userToFollow to the currentUser's followings
                    if (currentUser.followings) {
                        currentUser.update({
                            followings: [...currentUser.followings, userToFollow.user_id]
                        })
                    } else {
                        currentUser.update({
                            followings: [userToFollow.user_id]
                        })
                    }
                    // add currentUser to the userToFollow's followers
                    if (userToFollow.followers) {
                        userToFollow.update({
                            followers: [...userToFollow.followers, currentUser.user_id]
                        })
                    } else {
                        userToFollow.update({
                            followers: [currentUser.user_id]
                        })
                    }

                    const userToFollowNotifications = userToFollow.notification_id
                    if (!userToFollowNotifications) {

                        const notification = await Notification.create({
                            user_id: userToFollow.user_id,
                            notifications: [{
                                notification: `${currentUser.username} started following you.`,
                                image: currentUser.image,
                            }]
                        })
                        await userToFollow.update({
                            notification_id: notification.notification_id
                        })

                    } else {
                        const notification = await Notification.findOne({
                            where: {
                                notification_id: userToFollowNotifications
                            }
                        })
                        notification.notifications = [...notification.notifications, {
                            notification: `${currentUser.username} started following you.`,
                            image: currentUser.image,
                        }]
                        await notification.save()
                    }

                    res.status(200).json({message: 'followed'})
                }
            }
        } else {
            // if any of the users don't exist
            res.status(404).json({message: 'user not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.user
        const username = req.params.username

        if (user.username === username) {
            let {name, bio} = req.body

            name = name || null
            bio = bio || null
            let image = null

            if (req.file) {
                image = req.file.path
            }

            const userToUpdate = await User.findOne({
                where: {
                    user_id: user.user_id
                }
            })

            if (userToUpdate) {
                userToUpdate.name = name || userToUpdate.name
                userToUpdate.bio = bio || userToUpdate.bio
                if (userToUpdate.image && image) {
                    // delete previous image if it exists
                    fs.unlinkSync(userToUpdate.image)
                }

                if (image) {
                    userToUpdate.image = image
                }


                userToUpdate.save()
                res.status(200).json({message: 'user updated'})
            } else {
                res.status(404).json({message: 'user not found'})
            }

        } else {
            res.status(401).json({message: 'you can only update your own profile'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getSearchedUsers = async (req, res) => {
    try {
        const keyword = req.params.keyword
        if (keyword) {
            const users = await User.findAll({
                where: {

                    // or name
                    [Op.or]: [
                        {
                            username: {
                                [Op.like]: `%${keyword}%`
                            },
                        },
                        {
                            name: {
                                [Op.like]: `%${keyword}%`
                            },
                        }
                    ]
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            res.status(200).json(users)
        } else {
            res.status(400).json({message: 'keyword can\'t be empty'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getFollowings = async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({
            where: {
                username
            }
        })

        if (user) {
            if (user.followings) {
                const followings = await User.findAll({
                    where: {
                        user_id: {
                            [Op.in]: user.followings
                        }
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
                res.status(200).json(followings)
            } else {
                res.status(200).json([])
            }

        } else {
            res.status(404).json({message: 'user not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getFollowers = async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({
            where: {
                username
            }
        })

        if (user) {
            if (user.followers) {
                const followings = await User.findAll({
                    where: {
                        user_id: {
                            [Op.in]: user.followers
                        }
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
                res.status(200).json(followings)
            } else {
                res.status(200).json([])
            }

        } else {
            res.status(404).json({message: 'user not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = {
    getAllUser,
    postUser,
    loginUser,
    getUserByUsername,
    followToggle,
    updateUser,
    getLastTenUsers,
    getSearchedUsers,
    getFollowings,
    getFollowers
}
