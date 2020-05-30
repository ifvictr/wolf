export const getAuthorLink = (teamDomain: string, userId: string): string =>
    `https://${teamDomain}.slack.com/team/${userId}`

export const getFallbackText = (ts: string, username: string, text: string): string =>
    `[${ts}] ${username}: ${text}`

export const getUrl = (teamDomain: string, channelId: string, messageId: string): string =>
    `https://${teamDomain}.slack.com/archives/${channelId}/p${messageId}`

// Inserts zero-width non-joiner to prevent special tags like "@everyone" and "<!channel|channel>" from working
export const removeSpecialTags = (str: string): string => str
    .replace(/@(channel|everyone|here)/ig, '@\u200c$1')
    .replace(/\<\!(channel|everyone|here)\|(.*?)\>/ig, '<\u200c!$1|$2>')
