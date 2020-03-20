const express = require ('express') ;
const app = express() ;
const http = require('http').createServer(app) ;
const io = require('socket.io')(http) ;
const PORT = 3000 ;

let positions= [
    {
      x: 340,
      y: 620,
    },
    {
      x: 100,
      y: 620
    }
  ]

let winner = true
let idFirst;
let idSecond;

io.on('connection', socket => {
    socket.emit('positions', positions);
    socket.on('move', data => {

        if(!idFirst && !idSecond) {
            idFirst = data.id
            positions[0].y -=data.dice;
            if (positions[0].y <=0 ) {
                positions[0].y = 0
                io.emit('positions', positions)
                io.emit('winner', winner)
            } else {
                io.emit('positions', positions)
            }
            
        } else if(idFirst && !idSecond && idFirst !== data.id) {
            positions[1].y -=data.dice;
                if (positions[1].y <=0 ) {
                    positions[1].y = 0
                    io.emit('positions', positions)
                    io.emit('winner', winner)
                } else {
                    io.emit('positions', positions)
                }

        } else if(idFirst && idSecond) {

        }
            if (idFirst === data.id) {
                positions[0].y -=data.dice;
                if (positions[0].y <=0 ) {
                    positions[0].y = 0
                    io.emit('positions', positions)
                    io.emit('winner', winner)
                } else {
                    io.emit('positions', positions)
                }
            } else if(idSecond === data.id){
                positions[1].y -=data.dice;
                if (positions[1].y <=0 ) {
                    positions[1].y = 0
                    io.emit('positions', positions)
                    io.emit('winner', winner)
                } else {
                    io.emit('positions', positions)
                }
            }

    })

})

http.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
})