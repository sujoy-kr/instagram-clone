const {post: Post} = require('../models')

const getAllPosts = async (req, res) => {
    try {
        const users = await Post.findAll({})
        res.status(200).json(users)

    } catch (e) {
        res.status(500).json(e.message)
    }
}


module.exports = {
    getAllPosts
}