const genField = () => {
  let field = []
  for (let y = 0; y < 1000; y++) {
    let row = []
    while (row.length < 1000) {
      const seed = Math.floor(Math.random() * 3)
      switch (seed) {
        case 0:
          const bottom = new Array(Math.floor(Math.random() * 9) + 1).fill(',')
          row = [...row, '.', ...bottom, '.']
          break
        case 1:
          const plateau = new Array(Math.floor(Math.random() * 9) + 1).fill('^')
          row = [...row, '/', ...plateau, '\\']
          break
        case 2:
          row = [...row, '*']
          break
        default:
          console.log(`No case for: ${seed}`)
          row.push('_')
          break
      }
    }
    console.log('post-switch')
    field = [...field, row]
  }
  console.log(field)
  return field
}

module.exports = genField
