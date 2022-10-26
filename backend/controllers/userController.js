const {user: User} = require('../models')
const jwt = require('../utils/jwt')

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
        const jwtUser = {
            id: username.user_id,
            username: user.username
        }
        const token = jwt.sign(jwtUser)

        res.status(201).json({token})
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
            const jwtUser = {
                id: username.user_id,
                username: user.username
            }
            const token = jwt.sign(jwtUser)

            res.status(201).json({token})
        } else {
            res.status(401).json({message: 'user not found'})
        }
    } else {
        res.status(401).json({message: 'Username or password can\'t be empty'})
    }
}

module.exports = {
    getAllUser,
    postUser,
    loginUser
}
