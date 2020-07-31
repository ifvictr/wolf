export const getAuthorLink = (teamDomain: string, userId: string): string =>
  `https://${teamDomain}.slack.com/team/${userId}`

export const getFallbackText = (
  ts: string,
  username: string,
  text: string
): string => `[${ts}] ${username}: ${text}`

// Inserts zero-width non-joiner to prevent special tags like "@everyone" and "<!channel|channel>" from working
export const removeSpecialTags = (str: string): string =>
  str
    .replace(/@(channel|everyone|here)/gi, '@\u200c$1')
    .replace(/\<\!(channel|everyone|here)\|(.*?)\>/gi, '<\u200c!$1|$2>')
