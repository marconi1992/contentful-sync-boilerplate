const path = require('path')
const templater = require('json-templater/object')
const dotenv = require('dotenv')
const contentfulImport = require('contentful-import')

dotenv.load()

const spaceId = process.env.CONTENTFUL_SPACE_ID
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN

if (!spaceId) {
  console.error('set CONTENTFUL_SPACE_ID is required')
}

if (!managementToken) {
  console.error('set CONTENTFUL_MANAGEMENT_TOKEN is required')
}

let { webhooks } = require(path.join(__dirname, 'webhooks.json'))

webhooks = templater(webhooks, { ...process.env })

const options = {
  spaceId,
  managementToken,
  skipContentModel: true,
  content: {
    webhooks
  }
}

contentfulImport(options)
