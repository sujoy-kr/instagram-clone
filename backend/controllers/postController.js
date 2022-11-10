const {post: Post, user: User, notification: Notification} = require('../models')

const getAllPosts = async (req, res) => {
    try {
        const users = await Post.findAll({})
        res.status(200).json(users)

    } catch (e) {
        res.status(500).json(e.message)
    }
}

const createPost = async (req, res) => {
    try {
        const user = req.user

        if (req.file) {
            const url = req.file.path
            try {

                const title = req.body.title
                const post = await Post.create({url, title, user_id: user.user_id})
                const postUser = await User.findOne({where: {user_id: user.user_id, username: user.username}})

                if (postUser.posts) {
                    postUser.update({posts: [...postUser.posts, post.post_id]})
                } else {
                    postUser.update({posts: [post.post_id]})
                }
                res.status(201).json(post)
            } catch (e) {
                res.status(500).json(e.message)
            }
        } else {
            res.status(400).json({message: 'no image found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getFeed = async (req, res) => {
    try {
        const user = req.user
        const currentUser = await User.findOne({where: {user_id: user.user_id, username: user.username}})
        if (currentUser) {
            const followedUsersId = currentUser.followings
            if (followedUsersId) {
                let feed = []
                try {
                    for (const id of followedUsersId) {
                        const user = await User.findOne({where: {user_id: id}})
                        const userCopy = {
                            username: user.username,
                            image: user.image,
                        }
                        const postIDs = user.posts
                        if (postIDs) {
                            for (const id of postIDs) {
                                const post = await Post.findOne({where: {post_id: id}})
                                let postCopy = {
                                    ...post.dataValues
                                }
                                postCopy.owner = userCopy
                                feed.push(postCopy)
                            }
                        }
                    }
                    feed.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    })

                    res.status(200).json(feed)
                } catch (e) {
                    res.status(500).json({message: e.message})
                }
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

const toggleLike = async (req, res) => {
    try {
        const user = req.user
        const post_id = req.params.id
        const currentUser = await User.findOne({where: {user_id: user.user_id, username: user.username}})
        if (currentUser) {
            const post = await Post.findOne({where: {post_id}})
            if (post) {
                if (post.likes) {
                    if (post.likes.includes(currentUser.user_id)) {
                        // remove like
                        const newLikes = post.likes.filter(id => id !== currentUser.user_id)
                        await post.update({likes: newLikes})
                        await post.save()

                        if (currentUser.user_id !== post.user_id) {
                            // for notification
                            const postOwner = await User.findOne({where: {user_id: post.user_id}})
                            const postOwnerNotification = postOwner.notification_id
                            if (!postOwnerNotification) {
                                const notification = await Notification.create({
                                    user_id: postOwner.user_id,
                                    notifications: [{
                                        notification: `${currentUser.username} unliked your photo.`,
                                        image: currentUser.image,
                                    }]
                                })
                                await postOwner.update({
                                    notification_id: notification.notification_id
                                })
                            } else {
                                const notification = await Notification.findOne({
                                    where: {
                                        notification_id: postOwnerNotification
                                    }
                                })
                                notification.notifications = [...notification.notifications, {
                                    notification: `${currentUser.username} unliked your photo.`,
                                    image: currentUser.image,
                                }]
                                await notification.save()
                            }
                        }

                        res.status(200).json(post)
                    } else {
                        // add like
                        const newLikes = [...post.likes, currentUser.user_id]
                        await post.update({likes: newLikes})
                        await post.save()

                        // for notification
                        if (currentUser.user_id !== post.user_id) {
                            const postOwner = await User.findOne({where: {user_id: post.user_id}})
                            const postOwnerNotification = postOwner.notification_id
                            if (!postOwnerNotification) {
                                const notification = await Notification.create({
                                    user_id: postOwner.user_id,
                                    notifications: [{
                                        notification: `${currentUser.username} liked your photo.`,
                                        image: currentUser.image,
                                    }]
                                })
                                await postOwner.update({
                                    notification_id: notification.notification_id
                                })
                            } else {
                                const notification = await Notification.findOne({
                                    where: {
                                        notification_id: postOwnerNotification
                                    }
                                })
                                notification.notifications = [...notification.notifications, {
                                    notification: `${currentUser.username} liked your photo.`,
                                    image: currentUser.image,
                                }]
                                await notification.save()
                            }
                        }

                        res.status(200).json(post)
                    }
                } else {
                    // liked for the first time
                    const likes = [currentUser.user_id]
                    post.likes = likes
                    await post.save()

                    // for notification
                    if (currentUser.user_id !== post.user_id) {
                        const postOwner = await User.findOne({where: {user_id: post.user_id}})
                        const postOwnerNotification = postOwner.notification_id
                        if (!postOwnerNotification) {
                            const notification = await Notification.create({
                                user_id: postOwner.user_id,
                                notifications: [{
                                    notification: `${currentUser.username} liked your photo.`,
                                    image: currentUser.image,
                                }]
                            })
                            await postOwner.update({
                                notification_id: notification.notification_id
                            })
                        } else {
                            const notification = await Notification.findOne({
                                where: {
                                    notification_id: postOwnerNotification
                                }
                            })
                            notification.notifications = [...notification.notifications, {
                                notification: `${currentUser.username} liked your photo.`,
                                image: currentUser.image,
                            }]
                            await notification.save()
                        }
                    }

                    res.status(200).json(post)
                }
            } else {
                res.status(404).json({message: 'post not found'})
            }
        } else {
            res.status(404).json({message: 'user not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const updatePost = async (req, res) => {
    try {
        const user = req.user
        const post_id = req.params.id
        const currentUser = await User.findOne({where: {user_id: user.user_id, username: user.username}})
        if (currentUser) {
            const post = await Post.findOne({where: {post_id}})
            if (post) {
                const comment = req.body.comment
                if (comment) {
                    const comment = {
                        username: currentUser.username,
                        comment: req.body.comment
                    }
                    if (post.comments) {
                        const newComments = [...post.comments, comment]
                        await post.update({comments: newComments})
                        await post.save()
                        res.status(200).json(post)
                    } else {
                        post.comments = [comment]
                        await post.save()
                        res.status(200).json(post)
                    }

                    // for notification
                    if (currentUser.user_id !== post.user_id) {
                        const commentOwner = await User.findOne({where: {user_id: post.user_id}})
                        const commentOwnerNotification = commentOwner.notification_id
                        if (!commentOwnerNotification) {
                            const notification = await Notification.create({
                                user_id: commentOwner.user_id,
                                notifications: [{
                                    notification: `${currentUser.username} commented your photo.`,
                                    image: currentUser.image,
                                }]
                            })
                            await commentOwner.update({
                                notification_id: notification.notification_id
                            })
                        } else {
                            const notification = await Notification.findOne({
                                where: {
                                    notification_id: commentOwnerNotification
                                }
                            })
                            notification.notifications = [...notification.notifications, {
                                notification: `${currentUser.username} commented your photo.`,
                                image: currentUser.image,
                            }]
                            await notification.save()
                        }
                    }
                } else {
                    res.status(400).json({message: 'no comment found'})
                }
            } else {
                res.status(404).json({message: 'post not found'})
            }
        } else {
            res.status(404).json({message: 'user not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getPostById = async (req, res) => {
    try {
        const post_id = req.params.id
        const post = await Post.findOne({where: {post_id}})
        if (post) {
            const postCopy =
                {
                    ...post.dataValues
                }
            const user = await User.findOne({where: {user_id: post.user_id}})
            const userCopy = {
                username: user.username,
                image: user.image,
            }
            postCopy.owner = userCopy
            res.status(200).json(postCopy)
        } else {
            res.status(404).json({message: 'post not found'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getFeed,
    toggleLike,
    updatePost,
    getPostById
}