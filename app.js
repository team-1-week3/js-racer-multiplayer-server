const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

http.listen(PORT, () => {
    console.log(`Server OK! ${PORT}`)
})