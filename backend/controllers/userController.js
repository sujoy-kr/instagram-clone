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
    const {username, password, name, email} = req.body
    await User.create({
        username: username,
        password: password,
        name: name,
        email: email,
    }).then((user) => {
        res.status(201).json(user)
    }).catch(err => {
        res.status(500).json({message: err.message})
    })
}

const loginUser = async (req, res) => {
    const {username, password} = req.body
    if (username && password) {
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
    } else {
        res.json({message: 'Username or password can\'t be empty'})
    }
}

module.exports = {
    getAllUser,
    postUser,
    loginUser
}
