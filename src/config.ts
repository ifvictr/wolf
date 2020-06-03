interface WolfConfig {
    databaseUrl: string
    port: number | string
    botToken: string
    signingSecret: string
    stateSecret: string
    clientId: string
    clientSecret: string
    enableDisclaimers: boolean
}

const config: WolfConfig = {
    databaseUrl: process.env.DATABASE_URL || process.env.MONGODB_URI || '',
    port: process.env.PORT || 3000,
    // Slack-specific config
    botToken: process.env.SLACK_CLIENT_BOT_TOKEN || '',
    signingSecret: process.env.SLACK_CLIENT_SIGNING_SECRET || '',
    stateSecret: process.env.SLACK_STATE_SECRET || '',
    clientId: process.env.SLACK_CLIENT_ID || '',
    clientSecret: process.env.SLACK_CLIENT_SECRET || '',
    enableDisclaimers: process.env.SLACK_ENABLE_DISCLAIMERS === 'true' || false
}

export default config
