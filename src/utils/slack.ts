import { WebAPICallResult } from '@slack/web-api'

export interface ConversationsInfoResult extends WebAPICallResult {
    channel: any // This is bad
}

export interface UsersInfoResult extends WebAPICallResult {
    user: any // This is bad
}
