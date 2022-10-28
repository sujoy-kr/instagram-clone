const {user: User} = require('../models')
const jwt = require('../utils/jwt')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

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

    if (username && password && name && email) {
        const hashedPass = await bcrypt.hash(password, config.SALT_ROUND)
        console.log(hashedPass)
        await User.create({
            username: username,
            password: hashedPass,
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
                    id: username.user_id,
                    username: user.username
                }
                const token = jwt.sign(jwtUser)

                res.status(200).json({token})
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

module.exports = {
    getAllUser,
    postUser,
    loginUser
}
