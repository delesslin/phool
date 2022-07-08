const fs = require('fs')
const csv = require('csvtojson')
const seedDB = (csvFilePath = './db/seed.csv') => {
  csv({ noheader: true })
    .fromFile(csvFilePath)
    .then((o) => o.map((entry) => entry.field1))
    .then((jsonObj) => {
      console.log(jsonObj)
      fs.writeFile('./db/db.json', JSON.stringify(jsonObj), (err) => {
        if (err) {
          console.error(err)
        }
        console.log('DB seeded')
      })
    })
}

module.exports = seedDB
