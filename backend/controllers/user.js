const User = require('../models/User')

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json({ msg: `Hello , ${req.user.userName}`, users })
}

const getUserById = async (req, res) => {
    console.log(req.params)
    try {
        // find by id and only return name and email of the user
        const user = await User.findById(req.params.id, 'name email')
        if(!user){
            return res.status(400).json({ msg: `Please provide correct user id`})
        }
        res.status(200).json({ user })
    } catch (error) {
        return res.status(400).json({ msg: `Please provide correct user id` })
    }
}

const deleteUserById = async (req, res) => {
    try {
        // find by id and only return name and email of the user
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).json({ msg: `Please provide correct user id`})
        }
        res.status(200).json({ msg: "User Deleted", user: { name: user.name, email: user.email } })
    } catch (error) {
        return res.status(400).json({ msg: `Please provide correct user id`})
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById
}