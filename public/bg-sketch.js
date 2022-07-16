const style = (el, obj = {}) => {
  const keys = Object.keys(obj)
  keys.forEach((key, i) => {
    el.style[key] = obj[key]
  })
}
console.log('BACKGROUND BB!')
const fontSize = 10
const body = document.getElementsByTagName('body')[0]
body.style.fontSize = `${fontSize}px`
body.style.lineHeight = `${fontSize}px`
const rows = Math.floor(body.offsetHeight / 6) + 1
const cols = body.offsetWidth / 6
const main = document.createElement('div')
style(main, {
  color: 'limegreen',
  margin: '0px',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
})
function setup() {
  for (let y = 0; y < rows; y++) {
    console.log('new row')
    const row = document.createElement('p')
    style(row, {
      display: 'flex',
      flex: 1,
      flexWrap: 'no-wrap',
    })

    for (let x = 0; x < cols; x++) {
      // console.log({ x, y })
      row.innerText = row.innerText + '_'
    }
    main.append(row)
  }
  body.append(main)
}

function draw() {
  console.log('loop!')
}
