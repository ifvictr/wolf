import { WebAPICallResult } from '@slack/web-api'

export interface ConversationsInfoResult extends WebAPICallResult {
  channel: {
    name: string
  }
}

export interface UsersInfoResult extends WebAPICallResult {
  user: {
    id: string
    name: string
    profile: {
      display_name: string
      image_48: string
      real_name: string
    }
  }
}
