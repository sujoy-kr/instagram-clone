const {post: Post, user: User} = require('../models')

const getAllPosts = async (req, res) => {
    try {
        const users = await Post.findAll({})
        res.status(200).json(users)

    } catch (e) {
        res.status(500).json(e.message)
    }
}

const createPost = async (req, res) => {
    const user = req.user

    if (req.file) {
        const url = req.file.path
        try {
            const post = await Post.create({url, user_id: user.user_id})
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

}

const getFeed = async (req, res) => {
    const user = req.user
    const currentUser = await User.findOne({where: {user_id: user.user_id, username: user.username}})
    const followedUsersId = currentUser.followings
    let feed = []
    try {
        for (const id of followedUsersId) {
            const user = await User.findOne({where: {user_id: id}})
            const userCopy = {
                username: user.username,
            }
            const postIDs = user.posts
            for (const id of postIDs) {
                const post = await Post.findOne({where: {post_id: id}})
                let postCopy = {
                    ...post.dataValues
                }
                postCopy.owner = userCopy
                console.log(postCopy)
                feed.push(postCopy)
            }
        }
        // console.log('feed', feed)
        res.status(200).json(feed)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getFeed
}