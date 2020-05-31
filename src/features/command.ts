import { App } from '@slack/bolt'
import { ComposerModal, ComposerModalProps, Disclaimer } from '../blocks'
import config from '../config'
import * as utils from '../utils'
import { ConversationsInfoResult, FullMessageAttachment, UsersInfoResult } from '../utils/slack'

export default (app: App) => {
    app.command('/wolf', async ({ ack, client, command }) => {
        await ack()

        // Pre-populate the modal with sensible defaults
        const props: ComposerModalProps = {
            conversation: command.channel_id,
            date: new Date().toISOString().slice(0, 10) // Only keep the date
        }
        await client.views.open({
            trigger_id: command.trigger_id,
            view: ComposerModal(props)
        })
    })

    app.view('composer', async ({ ack, body, client, view }) => {
        await ack()

        // Extract state values
        const {
            date_input,
            destination_conversation_input,
            message_input,
            message_type_input,
            source_conversation_input,
            user_input
        } = view.state.values
        const destinationConversation = destination_conversation_input.select_destination_conversation.selected_conversation
        const sourceConversation = source_conversation_input.select_source_conversation.selected_conversation
        const selectedDate = date_input.select_date.selected_date
        const inputMessage = message_input.input_message.value
        const selectedMessageType = message_type_input.select_message_type.selected_option.value
        const selectedUser = user_input.select_user.selected_user

        try {
            // Get relevant info
            const [{ channel }, { user }] = await Promise.all([
                client.conversations.info({ channel: sourceConversation }) as Promise<ConversationsInfoResult>,
                client.users.info({ user: selectedUser }) as Promise<UsersInfoResult>
            ])

            const signature = ` (Sent via Wolf by <@${body.user.id}>)`
            const ts = new Date(selectedDate).getTime() / 1000 // TODO: Fix dates being off by one day
            const messageUrl = utils.getUrl(body.team.domain, sourceConversation, ts.toString())
            const wolfMessage: FullMessageAttachment = {
                author_icon: user.profile.image_48,
                author_id: user.id,
                author_link: utils.getAuthorLink(body.team.domain, user.id),
                author_name: user.profile.display_name || user.profile.real_name,
                author_subname: user.profile.display_name || user.profile.real_name,
                channel_id: sourceConversation,
                channel_name: channel.name,
                color: 'D0D0D0',
                fallback: utils.getFallbackText(ts.toString(), user.name, inputMessage) + signature,
                footer: `${selectedMessageType === 'message' ? 'Posted' : 'From a thread'} in #${channel.name}`,
                from_url: messageUrl,
                mrkdwn_in: ['text'],
                original_url: messageUrl,
                text: utils.removeSpecialTags(inputMessage),
                ts: ts.toString(),
            }

            await client.chat.postMessage({
                channel: destinationConversation,
                user: body.user.id,
                text: '',
                attachments: [
                    wolfMessage,
                    // Optionally include disclaimers
                    ...config.enableDisclaimers
                        ? [{ blocks: [Disclaimer()] }]
                        : []
                ]
            })
        } catch (e) {
            await client.chat.postEphemeral({
                channel: destinationConversation,
                user: body.user.id,
                text: `Failed to send. Reason: \`${e.data.error}\``
            })
        }
    })
}
