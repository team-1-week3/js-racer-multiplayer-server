const express = require ('express') ;
const app = express() ;
const http = require('http').createServer(app) ;
const io = require('socket.io')(http) ;
// const PORT = 3000 ;
const PORT = process.env.PORT || 3000

let positions= [
    {
      top: 80,
      x: 340,
      y: 620,
    },
    {
      top: 80,
      x: 100,
      y: 620
    }
  ]

let idFirst;
let idSecond;

io.on('connection', socket => {    
    socket.emit('positions', positions);
    socket.on('move', data => {

        if(!idFirst && !idSecond) {
            idFirst = data.id
            positions[0].top -= 2; // top -5
            if (positions[0].top <=0 ) {
                positions[0].top = 0
                io.emit('positions', positions)
                io.emit('winner', data.name)
            } else {
                io.emit('positions', positions)
            }
            
        } else if(idFirst && !idSecond && idFirst !== data.id) {
            positions[1].top -= 2; // top -5
                if (positions[1].top <=0 ) {
                    positions[1].top = 0
                    io.emit('positions', positions)
                    io.emit('winner', data.name)
                } else {
                    io.emit('positions', positions)
                }

        } else if(idFirst && idSecond) {

        }
            if (idFirst === data.id) {
                positions[0].top -= 2; // top -5
                if (positions[0].top <=0 ) {
                    positions[0].top = 0
                    io.emit('positions', positions)
                    io.emit('winner', data.name)
                } else {
                    io.emit('positions', positions)
                }
            } else if(idSecond === data.id){
                positions[1].top -= 2; // top -5
                if (positions[1].top <=0 ) {
                    positions[1].top = 0
                    io.emit('positions', positions)
                    io.emit('winner', data.name)
                } else {
                    io.emit('positions', positions)
                }
            }

    })

})

http.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
})