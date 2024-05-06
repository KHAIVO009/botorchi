module.exports.config = {
	name: "rules",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "kudos",
	description: "",
	usePrefix: false,
  commandCategory: "info",
	cooldowns: 1
};

module.exports.run = ({ event, api }) => api.sendMessage(`Terms of use bot in the box:
⚠ Please strictly comply to avoid being restricted from using commands (user ban)
1: Do not spam bot commands, spam prefixes too much to cause death bots, cp....
2: Do not cause war with bots ( sim modules ... ) because these are not real interactive users!
3: Do not abuse bots for malicious purposes.,...
4: avoid swearing bot (mura), the bot will automatically ban you from the system....
5: don't resend bot message.
6: More updates ....
\nhttps://www.facebook.com/localhostsoriano`, event.threadID, event.messageID);