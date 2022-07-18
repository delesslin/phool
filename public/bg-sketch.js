let field_data = [],
  res,
  bg = `#433E0E`,
  field,
  loaded = true,
  socket = io({ path: '/phools/io' }),
  fontSize = 10,
  body = document.getElementsByTagName('body')[0],
  rows = Math.floor(body.offsetHeight / 6) + 1,
  cols = body.offsetWidth / 6
body.style.backgroundColor = bg
// socket.on('field', (data) => {
//   console.log(data)
//   field_data = data
//   loaded = true
// })
function preload() {
  res = loadJSON('/phools/bg/field')

  console.log('got!')
  console.log(res)
}

class Item {
  constructor({ x, y, txt }) {
    this.txt = txt
    this.pos = { x, y }
  }
  draw() {
    text(this.txt, this.pos.x, this.pos.y)
  }
}
class Field {
  constructor() {
    this._array = []
    for (let y = 0; y < rows; y++) {
      const row = []
      for (let x = 0; x < cols; x++) {
        row.push(new Item({ txt: 'X', x: x * fontSize, y: y * fontSize }))
      }
      this._array.push(row)
    }
  }
  draw() {
    for (let row = 0; row < this._array.length; row++) {
      const curr = field_data[row].shift()
      field_data[row].push(curr)
      for (let item = 0; item < this._array[row].length; item++) {
        if (field_data[row] !== null) {
          const txt = field_data[row][item]
          this._array[row][item].txt = txt
        }
        this._array[row][item].draw()
      }
    }
  }
}
function setup() {
  const keys = Object.keys(res)
  for (let key of keys) {
    field_data.push(res[key])
  }
  console.log(field_data)
  createCanvas(body.offsetWidth, body.offsetHeight)
  textFont('monospace')
  textSize(fontSize)
  field = new Field()
  frameRate(10)
}

function draw() {
  if (loaded) {
    background(bg)
    fill('#E7F9A9')
    field.draw()
  }
}
