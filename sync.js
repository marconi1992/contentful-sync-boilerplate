const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const changesets = require('diff-json')

dotenv.load()

const environmentId = process.env.CONTENTFUL_ENV || 'master'

const newData = require(path.join(__dirname, `contentful-${environmentId}.json`))
const oldData = require(path.join(__dirname, `contentful.json`))
const diff = changesets.diff(oldData, newData, {
  'contentTypes': 'name',
  'contentTypes.fields': 'id'
})

const filteredDiff = diff.filter(function (item) {
  const { changes } = item

  item.changes = changes.filter(function (item) {
    const { changes, type } = item
    if (type === 'update') {
      item.changes = changes.filter(function (item) {
        const { key } = item
        return key === 'fields'
      })

      return item.changes.length
    }

    return true
  })

  return item.changes.length
})

changesets.applyChanges(oldData, filteredDiff)

fs.writeFileSync('contentful.json', JSON.stringify(oldData, null, 2))
