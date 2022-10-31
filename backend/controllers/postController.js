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
            // console.log(postUser)
            res.status(201).json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    } else {
        res.status(400).json({message: 'no image found'})
    }

}

module.exports = {
    getAllPosts,
    createPost
}