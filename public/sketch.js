const size = 200
let txt = 'My name is Roo and I am an artist'
const center = { x: 0, y: 0 }
let arr = []
let tick = 0
let reset = 0
let bg = 255

const speed = 5
const el = document.querySelector('#sketch')
el.addEventListener('click', (ev) => {
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
const socket = io({path: '/phools/io'})

socket.on('init', (data) => {
  console.log(data)
  txt = data
  document.getElementById('txt').innerText = txt
})

const mapChar = (index, rangeMin, rangeMax) => {
  return map(txt.charCodeAt(index) % 100 || 0, 0, 100, rangeMin, rangeMax)
}
function setup() {
  const canvas = createCanvas(233, 300)
  canvas.parent('sketch')

  frameRate(2)

  angleMode(DEGREES)
  txt = document.getElementById('txt').value
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
function handleNewText() {
  reset = 1

  txt = document.getElementById('txt').value
console.log('emitting new text: ', txt)
  socket.emit('new', txt)
  arr = []
  // const mapChar = (index, rangeMin, rangeMax) => {
  //   return map(txt.charCodeAt(index) || 0, 0, 350, rangeMin, rangeMax)
  // }
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
  // let txt = document.getElementById('txt').value
  // console.log(txt)
  background('rgba(255,255,255,0.01)')
  if (reset) {
    reset = 0
    tick = 0
  }
  if (tick >= arr.length - 4) return
  translate(width / 2, height / 2)
  let angle = 360 / 12
  const a = arr[tick],
    b = arr[tick + 1] || center,
    c = arr[tick + 2],
    d = arr[tick + 3]
  const toColor = (val) => map(val, 0, 350, 0, 255)
  const red = toColor(a.x + b.x / 2),
    green = toColor(a.y + b.y / 2),
    blue = toColor(a.x + b.y / 2),
    opacity = toColor(a.y + b.x / 2)
  stroke(red, green, blue, opacity)
  strokeWeight(map(a.x + a.y + b.x + b.y / 4, 50, 350, 0, 5))
  for (let i = 0; i < 12; i++) {
    rotate(i * angle)
    push()
    line(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)
    pop()
    push()
    scale(1, -1)
    line(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)
    pop()
  }
  tick += 1
}
