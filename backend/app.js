require('dotenv').config()
const express = require('express')
const io = require('socket.io')(process.env.SOCKET_PORT,{
    cors:{
        origin : "*",
    }
})
const app = express()
const authRouter = require('./routes/authRouter')
const usersRouter = require('./routes/usersRouter')
const connectDB = require('./db/connect')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

io.on('connection',socket=>{
    console.log(socket.id)
    socket.on("send-message",(msg)=>{
        console.log(msg);
        // to send to all including the sender
        // io.emit("receive-message",msg);

        // to send to others excluding sender
        socket.broadcast.emit("receive-message",msg);
      })
})

start()