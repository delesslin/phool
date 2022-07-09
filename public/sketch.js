const size = 200
let txt = 'My name is Roo and I am an artist'
const center = { x: 0, y: 0 }
let arr = []
let tick = 0
let reset = 0
let bg = 255
const socket = io()
socket.on('init', (data) => {
  console.log(data)
  txt = data
  document.getElementById('txt').innerText = txt
})
// for (let i = 0; i < txt.length; i++) {
//   console.log(txt.charCodeAt(i))
// }
// const txt = document.getElementById('txt')
// console.log(txt)

const mapChar = (index, rangeMin, rangeMax) => {
  return map(txt.charCodeAt(index) % 100 || 0, 0, 100, rangeMin, rangeMax)
}
function setup() {
  const canvas = createCanvas(size, size)
  canvas.parent('sketch')
  background(bg)
  frameRate(2)
  const bttn = createButton('grow!', 0, 0)
  bttn.mousePressed(handleNewText)
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
  if (reset) {
    background(bg)
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

// function Line(start, end) {
//   this.tick = 0
//   let d = dist(x1, y1, x2, y2)
//   let sw = map(d, 0, 100, 20, 0)
//   let arr = []

//   this.draw = function () {}
// }
// class Line {
//   constructor(x1, y1, x2, y2) {
//     this.start = this.end = createVector(x2, y2)
//   }
//   draw() {
//     if (tick < 10) {
//       tick++
//     }
//   }
// }
