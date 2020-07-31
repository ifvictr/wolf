import { App } from '@slack/bolt'
import { Installation as IInstallation } from '@slack/oauth'
import mongoose from 'mongoose'
import config from './config'
import * as features from './features'
import Installation from './models/installation'

const init = async () => {
  console.log('Starting Wolf…')

  // Set up database connection
  await mongoose.connect(config.databaseUrl, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // Initialize Slack app
  const app = new App({
    signingSecret: config.signingSecret,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    stateSecret: config.stateSecret,
    scopes: [
      'channels:read',
      'chat:write',
      'chat:write.public',
      'commands',
      'groups:read',
      'users:read'
    ],
    installationStore: {
      storeInstallation: async installation => {
        // Prevent duplicate installations being stored
        const installationQuery = { 'team.id': installation.team.id }
        if (await Installation.exists(installationQuery)) {
          await Installation.deleteOne(installationQuery)
        }

        await Installation.create(installation)
      },
      fetchInstallation: async query => {
        const installation = (await Installation.findOne({
          'team.id': query.teamId
        })) as IInstallation
        return installation
      }
    }
  })

  // Load feature modules
  for (const [featureName, handler] of Object.entries(features)) {
    handler(app)
    console.log(`Loaded feature module: ${featureName}`)
  }

  const featuresCount = Object.keys(features).length
  console.log(
    `Loaded ${featuresCount} feature${featuresCount === 1 ? '' : 's'}`
  )

  // Start receiving events
  await app.start(config.port)
  console.log(`Listening on port ${config.port}`)
}

init()
