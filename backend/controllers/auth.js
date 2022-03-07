const User = require('../models/User')

const register = async (req, res) => {
    try {
        // create user in database
        const user = await User.create({ ...req.body })

        // generate access token for user
        const token = user.createJWT()
        res.status(200).json({ user: { name: user.name }, token })
    } catch (error) {
        res.status(400).send(error)
    }
}
const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: "Please provide email and password" })
    }

    // check the user in database
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(403).json({ msg: "Invalid credentials" })
    }

    // check if the password is correct
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(403).json({ msg: "Invalid credentials" })
    }

    // generate access token for user
    const token = user.createJWT()

    res.status(200).json({ user: { name: user.name }, token })
}


module.exports = {
    login, register
}