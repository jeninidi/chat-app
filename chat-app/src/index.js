const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const {generateMessage} = require('./utils/messages')
 

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket)=>{
    console.log('New WebSocket connection')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    socket.on('sendMessage', (message, callback)=>{
        const filter = new Filter()
            if (filter.isProfane(message)) {
                return callback('Profanity is not allowed')
            }

        io.emit('message', generateMessage(message))
        callback('Delivered!')
    }) 

    socket.on('sendLocation', (coords, callback)=>{
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longtitude}`)
        callback()
    })

    //built in event
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}!`)
})


//let count = 0

//server (emit) -> client(receive) - countUpdated
//client(emit ) -> server(receive) - increment

    //The commented down below code is a dummy code to test the server
    // socket.emit('countUpdated', count)

    // socket.on('increment', ()=>{
    //     count++
    //     //socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)
    // })


