const express = require('express')

const app = express()
const PORT = 3000
app.use(express.static('./public'))
app.get('/', (req, res) => {
  console.log('got a get!')
  res.sendFile('./public/index.html')
})

app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  }
  console.log(`Listening on http://localhost:${PORT}`)
})
