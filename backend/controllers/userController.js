const {user: User, post: Post} = require('../models')
const jwt = require('../utils/jwt')
const bcrypt = require('bcrypt')
const config = require('../utils/env_config')

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({})
        res.status(200).json(users)

    } catch (e) {
        res.status(500).json(e.message)
    }
}

const getUserByUsername = async (req, res) => {
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
            }
        })
        user.posts = posts
        res.status(200).json(user)
    } else {
        res.status(404).json({message: 'user not found'})
    }
}

const postUser = async (req, res) => {
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

            res.status(201).json({token, username: user.username})
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    } else {
        res.send(400).json({message: 'Username, password, name and email can\'t be empty'})
    }
}

const loginUser = async (req, res) => {
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

                res.status(200).json({token, username: user.username})
            } else {
                res.status(401).json({message: 'wrong password'})
            }
        } else {
            res.status(401).json({message: 'username not found'})
        }
    } else {
        res.status(401).json({message: 'Username or password can\'t be empty'})
    }
}

const followToggle = async (req, res) => {
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
                currentUser.update({
                    followings: currentUserFollowings.filter(following => following !== userToFollow.user_id)
                })

                const userToFollowFollowers = userToFollow.followers
                userToFollow.update({
                    followers: userToFollowFollowers.filter(follower => follower !== currentUser.user_id)
                })

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

                res.status(200).json({message: 'followed'})
            }
        }
    } else {
        // if any of the users don't exist
        res.status(404).json({message: 'user not found'})
    }
}

module.exports = {
    getAllUser,
    postUser,
    loginUser,
    getUserByUsername,
    followToggle
}
