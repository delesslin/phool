String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr
  if (this.length === 0) return hash
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
function Branch(begin, end) {
  this.begin = begin
  this.end = end
  this.finished = false
  this.display = true
  this.show = function () {
    if (this.display) {
      stroke(0, 50)
      line(this.begin.x, this.begin.y, this.end.x, this.end.y)
    }
  }
  this.branch = function (deg) {
    var dir = p5.Vector.sub(this.end, this.begin)
    dir.rotate(deg)
    dir.mult(0.67)
    var newEnd = p5.Vector.add(this.end, dir)
    var right = new Branch(this.end, newEnd)
    return right
  }
}

function Stalk(start, end, diameter = 20) {
  this.diameter = diameter
  this.grown = false
  this.array = [start]
  this.show = function () {
    fill(100)
    noStroke()
    for (let i = 0; i < this.array.length; i++) {
      circle(this.array[i].x, this.array[i].y, this.diameter)
    }
    const mostRecent = this.array[this.array.length - 1]
    const newVect = createVector(
      mostRecent.x + (noise(mostRecent.y) - 0.5) * 2,
      mostRecent.y - 1
    )
    this.array.push(newVect)
    // this.diameter = this.diameter - noise(this.diameter)
    if (newVect.y <= end.y) {
      this.grown = true
    }
  }
}

class Fungus {
  constructor() {
    this.stalk = new Stalk(
      createVector(width / 2, height),
      createVector(width / 2, 10),
      2
    )
    this.cap = []
    this.tick = 0
    this.loaded = false
    this._txt = ''
  }
  reset() {
    this.tick = 0
    this.cap = []
    this.stalk = new Stalk(
      createVector(width / 2, height),
      createVector(width / 2, 10),
      2
    )
  }
  get txt() {
    return this._txt
  }
  set txt(val) {
    if (this._txt.length > 0) {
      console.error(
        'Fungus.txt can only be set once and this one has already been set'
      )
    }
    this._txt = val
    this._hash = Math.abs(val.hashCode())
    console.log(this._hash)
    this.loaded = true
  }
  show() {
    if (!this.loaded) return
    if (!this.stalk.grown) {
      frameRate(50)
      this.stalk.show()
    } else {
      frameRate(2)
      if (this.cap.length < 1) {
        const b = createVector(
          this.stalk.array[this.stalk.array.length - 1].x,
          this.stalk.array[this.stalk.array.length - 1].y
        )
        const a = createVector(b.x, b.y - 50)
        var root = new Branch(a, b)
        root.display = false
        this.cap[0] = root
      }
      if (this.tick < 10) {
        // background('rgba(255,255,255,0.01)')
        for (let i = this.cap.length - 1; i >= 0; i--) {
          this.cap[i].show()
          if (!this.cap[i].finished) {
            const num = Math.floor(map(this._txt.length, 0, 17 * 22, 2, 6))

            const max = map(this._hash, 0, 9999999999, 25, 120)
            // console.log(max)
            let deg = map(noise(this._hash), 0, 1, -1 * max, 0)
            for (let j = 0; j < num; j++) {
              // console.log(deg)
              this.cap.push(this.cap[i].branch(deg))
              deg = deg + (max * 2) / num
            }
            this.cap[i].finished = true
            // this.cap.push(
            //   this.cap[i].branch(((-1 * PI) / 4) * (noise(i) - 0.05))
            // )
          }
        }
        this.tick++
      }
    }
  }
}
