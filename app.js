const express = require ('express') ;
const app = express() ;
const http = require('http').createServer(app) ;
const socketio = require('socket.io')(http) ;
const PORT = 3000 ;

let positions= []
let winner = false

socketio.on('connection', (socket) => {
    socket.on('move', data => {
        positions.push(data)
        console.log(positions);
        if (data.y <= 0) {
            winner = true
            socketio.emit('winner', true)
            console.log('yeay winners');
        }

    })
    // players.push(1)
    // console.log(players);
    // if (players.length === 2) {
    //     socket.emit('positions', positions);
    //     socket.emit('index', index);
    //     socket.on('move', data => {
    //         if (data.index %2 === 0) {
    //             index +=1
    //             socketio.emit('index', index);
    //             positions[0].y -=data.dice;
    //             if (positions[0].y <=0 ) {
    //                 positions[0].y = 0
    //                 socketio.emit('positions', positions)
    //                 socketio.emit('winner', winner)
    //             } else {
    //                 socketio.emit('positions', positions)
    //             }
    //         } else {
    //             index +=1
    //             socketio.emit('index', index);
    //             positions[1].y -=data.dice;
    //             if (positions[1].y <=0 ) {
    //                 positions[1].y = 0
    //                 socketio.emit('positions', positions)
    //                 socketio.emit('winner', winner)
    //             } else {
    //                 socketio.emit('positions', positions)
    //             }
    //         }
    //     })
    // }
})

http.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
})