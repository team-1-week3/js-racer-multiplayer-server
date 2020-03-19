const express = require ('express') ;
const app = express() ;
const http = require('http').createServer(app) ;
const socketio = require('socket.io')(http) ;
const PORT = 3000 ;

let positions= [
    {
      x: 340,
      y: 620
    },
    {
      x: 100,
      y: 620
    }
  ]

let winner = true
let index = 0

socketio.on('connection', (socket) => {
    socket.emit('positions', positions);
    socket.emit('index', index);
    socket.on('move', data => {
        if (data.index %2 === 0) {
            index +=1
            socketio.emit('index', index);
            positions[0].y -=data.dice;
            if (positions[0].y <=0 ) {
                positions[0].y = 0
                socketio.emit('positions', positions)
                socketio.emit('winner', winner)
            } else {
                socketio.emit('positions', positions)
            }
        } else {
            index +=1
            socketio.emit('index', index);
            positions[1].y -=data.dice;
            if (positions[1].y <=0 ) {
                positions[1].y = 0
                socketio.emit('positions', positions)
                socketio.emit('winner', winner)
            } else {
                socketio.emit('positions', positions)
            }
        }
    })
})

http.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
})