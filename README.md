# contentful-sync-boilerplate

## Install Dependencies

```
yarn
```

## Create Contentful Configuration File (Versioned)
In order to run the commands correctly you need to have a `contentful.json` file where the contentful configuration is versioned. You can copy the example file

```
cp contentful.example.json contenful.json
```

Note: Avoid `sys.space` and `sys.environment` definitions in your versioned file to avoid error importing to several contentful accounts.

## Set Env Variables
You need to create the `.env` file based on the example file

```
cp .env.example .env
```

After that you need to set the env variables:

```
CONTENTFUL_ENV: Enviornment Id
CONTENTFUL_SPACE_ID: Space Id
CONTENTFUL_MANAGEMENT_TOKEN: Generated Token For API
CONTENT_WEBHOOK: Base Url for your webhooks
```

## Export Current Configuration in a existing environment
You can create a file with the current configuration of any environment.

```
yarn export
```

It will create a file prefixed by the env id e.g `contentful-<env-id>.json`

## Sync Versioned File with Export File

This command will update almost all the changes on the versioned file, for content types updated will only update the changes made on the `fields` property to avoid conflicts with spaces and environment definitions if the versioned file is used to set up the configuration in several contentful accounts.

```
yarn sync
```

You can also get the latest changes and sync the versioned file in one step
```
yarn export:sync
```

## Import Contentful Configuration
Having the `contentful.json` file ready and the env variables define you can import the configuration.

```
yarn import:contentful
```

## Import Webhooks
You can also import webhooks: Note: Export webhooks is not supported yet.

You need to copy the example file:
```
yarn webhooks.example.json webhooks.json
```

The webhooks file allows you define template variables e.g 
```json
{
    "url": "{{CONTENT_WEBHOOK}}/content"
}
```

When the webhook is imported the variable inside the double brackets will be replaced for env variables.

Env File
```
CONTENT_WEBHOOK-http://example.com
```

Output Example

```
{
    "url": "http://example.com/content"
}
```


Run webhook import

```
yarn import:webhooks
```


