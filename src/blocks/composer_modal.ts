import { View } from '@slack/types'

export interface ComposerModalProps {
    conversation?: string
    date?: string
}

export const ComposerModal = (props?: ComposerModalProps): View => ({
    type: 'modal',
    callback_id: 'composer',
    title: {
        type: 'plain_text',
        text: 'Wolf'
    },
    submit: {
        type: 'plain_text',
        text: 'Send message'
    },
    blocks: [
        {
            type: 'input',
            block_id: 'message_input',
            label: {
                type: 'plain_text',
                text: 'What do you want to say?'
            },
            element: {
                type: 'plain_text_input',
                action_id: 'input_message',
                multiline: true,
                placeholder: {
                    type: 'plain_text',
                    text: 'Say something…'
                }
            }
        },
        {
            type: 'input',
            block_id: 'user_input',
            label: {
                type: 'plain_text',
                text: ':bust_in_silhouette: Who should this be said as?'
            },
            element: {
                type: 'users_select',
                action_id: 'select_user',
                placeholder: {
                    type: 'plain_text',
                    text: 'Select a user'
                }
            }
        },
        {
            type: 'input',
            block_id: 'date_input',
            label: {
                type: 'plain_text',
                text: ':calendar: When should it have been sent?'
            },
            element: {
                type: 'datepicker',
                action_id: 'select_date',
                placeholder: {
                    type: 'plain_text',
                    text: 'Select a date'
                },
                initial_date: props?.date
            }
        },
        {
            type: 'input',
            block_id: 'source_conversation_input',
            label: {
                type: 'plain_text',
                text: ':round_pushpin: Which conversation should this be from?'
            },
            element: {
                type: 'conversations_select',
                action_id: 'select_source_conversation',
                placeholder: {
                    type: 'plain_text',
                    text: 'Select a conversation'
                },
                initial_conversation: props?.conversation
                // default_to_current_conversation: true
            }
        },
        {
            type: 'input',
            block_id: 'destination_conversation_input',
            label: {
                type: 'plain_text',
                text: ':dart: Which conversation should this be shared to?'
            },
            element: {
                type: 'conversations_select',
                action_id: 'select_destination_conversation',
                placeholder: {
                    type: 'plain_text',
                    text: 'Select a conversation'
                },
                initial_conversation: props?.conversation
                // default_to_current_conversation: true
            }
        },
        {
            type: 'input',
            block_id: 'message_type_input',
            label: {
                type: 'plain_text',
                text: ':speech_balloon: What type of message will this be?'
            },
            element: {
                type: 'static_select',
                action_id: 'select_message_type',
                placeholder: {
                    type: 'plain_text',
                    text: 'Select a type'
                },
                options: [
                    {
                        text: {
                            type: 'plain_text',
                            text: 'Message'
                        },
                        value: 'message'
                    },
                    {
                        text: {
                            type: 'plain_text',
                            text: 'Thread reply'
                        },
                        value: 'thread_reply'
                    }
                ],
                initial_option: {
                    text: {
                        type: 'plain_text',
                        text: 'Message'
                    },
                    value: 'message'
                }
            }
        }
    ]
})
