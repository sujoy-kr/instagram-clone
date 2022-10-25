const {user: User} = require('../models')

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json(e.message)
    }
}

const postUser = async (req, res) => {
    try {
        const {username, password, name, email} = req.body
        const user = await User.create({
            username: username,
            password: password,
            name: name,
            email: email,
        })
        res.status(201).json(user)
    } catch (e) {
        res.status(500).json(e.message)
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body
    if (username && password) {
        try {
            const user = await User.findOne({
                where: {
                    username,
                    password
                }
            })
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({message: 'user not found'})
            }
        } catch (e) {
            res.json({message: e.message})
        }
    } else {
        res.json({message: 'Username or password can\'t be empty'})
    }
}

module.exports = {
    getAllUser,
    postUser,
    loginUser
}
