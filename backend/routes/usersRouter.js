const express = require('express')

const router = express.Router()

const authMiddleware = require("../middleware/auth")
const { getAllUsers ,getUserById,deleteUserById } = require('../controllers/user')

router.route('/').get(authMiddleware,getAllUsers)

router.route('/:id')
.get(authMiddleware,getUserById)
.delete(authMiddleware,deleteUserById)


module.exports = router