function Branch(begin, end) {
  this.begin = begin
  this.end = end
  this.finished = false
  this.display = true
  this.show = function () {
    if (this.display) {
      stroke(0, 10)
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
      mostRecent.x + (noise(mostRecent.x) * 10 - 5),
      mostRecent.y - 1
    )
    this.array.push(newVect)
    // this.diameter = this.diameter - noise(this.diameter)
    if (newVect.y <= end.y) {
      this.grown = true
    }
  }
}

function Fungus() {
  this.stalk = new Stalk(
    createVector(width / 2, height),
    createVector(width / 2, 10),
    2
  )
  this.cap = []
  this.tick = 0
  this.reset = function () {
    this.tick = 0
    this.cap = []
    this.stalk = new Stalk(
      createVector(width / 2, height),
      createVector(width / 2, 10),
      2
    )
  }
  this.show = function () {
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
        background('rgba(255,255,255,0.01)')
        for (let i = this.cap.length - 1; i >= 0; i--) {
          this.cap[i].show()
          if (!this.cap[i].finished) {
            this.cap.push(this.cap[i].branch((PI / 4) * (noise(i) - 0.05)))
            this.cap.push(
              this.cap[i].branch(((-1 * PI) / 4) * (noise(i) - 0.05))
            )
          }
        }
        this.tick++
      }
    }
  }
}
