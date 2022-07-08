const fs = require('fs')
const seedDB = require('./db/seedDB')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = 3000
let DATA = []
const dbPath = './db/db.json'
const readDB = () => JSON.parse(fs.readFileSync(dbPath, { encoding: 'utf-8' }))
app.use(express.static('./public'))
app.get('/', (req, res) => {
  console.log('got a get!')
  res.sendFile('./public/index.html')
})

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

http.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  }
  console.log(`Listening on http://localhost:${PORT}`)
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
