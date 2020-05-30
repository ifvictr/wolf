import { MessageAttachment } from '@slack/types'
import { WebAPICallResult } from '@slack/web-api'

export interface ConversationsInfoResult extends WebAPICallResult {
    channel: any // This is bad
}

export interface UsersInfoResult extends WebAPICallResult {
    user: any // This is bad
}

export interface FullMessageAttachment extends MessageAttachment {
    author_id?: string
    author_subname?: string
    channel_id?: string
    channel_name?: string
    from_url?: string
    id?: number
    is_msg_unfurl?: boolean
    is_reply_unfurl?: boolean
    is_share?: boolean
    original_url?: string
}
