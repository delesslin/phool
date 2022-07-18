const size = 200
let txt = 'My name is Roo and I am an artist'
const center = { x: 0, y: 0 }
let arr = []
let tick = 0
let reset = false
let bg = 255
let fungus
const speed = 5
const el = document.querySelector('#sketch')
el.addEventListener('click', (ev) => {
  document.getElementsByTagName('main')[0].style.borderWidth = '2px'
  console.log('CLICK')
  document.querySelector('#input').style.left = '0px'
  let opacity = 0
  const int = setInterval(() => {
    opacity = opacity + 0.01
    document.querySelector('#input').style.opacity = opacity
    if (opacity >= 1) {
      clearInterval(int)
    }
  }, speed)
})
const icon = document.querySelector('#icon')
icon.addEventListener('click', (ev) => {
  handleNewText()
  console.log('CLICK')
  let opacity = 1
  let int = setInterval(() => {
    opacity = opacity - 0.01
    document.querySelector('#input').style.opacity = opacity
    if (opacity <= 0) {
      document.querySelector('#input').style.left = '-300px'
      clearInterval(int)
    }
  }, speed)
})
const socket = io({ path: '/phools/io' })

socket.on('init', (data) => {
  console.log(data)
  txt = data
  document.getElementById('txt').innerText = txt
})

const mapChar = (index, rangeMin, rangeMax) => {
  return map(txt.charCodeAt(index) % 100 || 0, 0, 100, rangeMin, rangeMax)
}
const width = 233,
  height = 300,
  tree = []

let stalk

function setup() {
  const canvas = createCanvas(width, height)
  canvas.parent('sketch')
  frameRate(60)
  fungus = new Fungus()
}
function handleNewText() {
  background(255)
  document.getElementsByTagName('main')[0].style.borderWidth = '0px'
  fungus = new Fungus()
  reset = true
  txt = document.getElementById('txt').value
  console.log('emitting new text: ', txt)
  socket.emit('new', txt)
  arr = []

  arr.push(center)
  for (let i = 0; i < txt.length; i += 2) {
    arr.push({
      x: mapChar(i, 0, size),
      y: mapChar(i + 1, 0, size),
    })
  }
  arr.push(center)

  console.log(arr)
}
function draw() {
  fungus.show()
}
