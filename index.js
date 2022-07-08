const fs = require('fs')
const path = require('path')
const seedDB = require('./db/seedDB')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const PORT = 3050
const server = http.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  }
  console.log(`Listening on http://localhost:${PORT}`)
})

const { Server } = require('socket.io')
const io = new Server(server, {path: '/phools/io'})

let DATA = []
path.resolve(__dirname, '.')
const dbPath = __dirname + '/db/db.json'
const readDB = () => JSON.parse(fs.readFileSync(dbPath, { encoding: 'utf-8' }))
app.use('/phools', express.static(__dirname))
app.use('/phools/public', express.static(__dirname + '/public'))
app.get('/phools', (req, res) => {
  console.log('got a get!')
  res.sendFile(__dirname + '/public/index.html')
})
app.get('/phools/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});


//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected')
  socket.emit('init', DATA[Math.floor(Math.random() * DATA.length)])
  socket.on('new', (txt) => {
    console.log('Adding to db:', txt)
    fs.writeFileSync(dbPath, JSON.stringify([...readDB(), txt]))
  })
  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected')
  })
})

if (fs.existsSync(dbPath)) {
  // path exists
  console.log('DB already exists')
  DATA = readDB()
} else {
  console.log(seedDB())
  DATA = readDB()
}
console.log(DATA)
