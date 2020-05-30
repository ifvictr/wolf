import { App } from '@slack/bolt'
import config from './config'

const init = async () => {
    console.log('Starting Wolf…')

    // Initialize Slack app
    const app = new App({
        signingSecret: config.signingSecret,
        token: config.botToken,
        endpoints: '/api/messages'
    })

    // Start receiving events
    await app.start(config.port)
    console.log(`Listening on port ${config.port}`)
}

init()
