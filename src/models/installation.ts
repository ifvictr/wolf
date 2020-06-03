import { Installation as IInstallation } from '@slack/oauth'
import mongoose, { Document } from 'mongoose'

const InstallationSchema = new mongoose.Schema({
    appId: String,
    bot: {
        id: String,
        scopes: [String],
        token: String,
        userId: String
    },
    enterprise: {
        id: String,
        name: String
    },
    incomingWebhook: {
        channel: String,
        channelId: String,
        configurationUrl: String,
        url: String
    },
    team: {
        id: String,
        name: String
    },
    tokenType: String,
    user: {
        id: String,
        token: String,
        scopes: [String]
    }
})

type InstallationDocument = IInstallation & Document

export default mongoose.model<InstallationDocument>('Installation', InstallationSchema)
