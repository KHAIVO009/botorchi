const axios = require('axios');

module.exports["config"] = {
  name: "zer",
  version: "1.0.0",
  credits: "khaile",
  hasPermission: 0,
  commandCategory: "Ai-Chat",
  usage: "[zer] [prompt]",
  usePrefix: false,
  cooldown: 0
};

module.exports["run"] = async ({ api, event, args }) => {
  try {
    const query = args.join(" ") || "hello";
    const data = await api.getUserInfo(event.senderID);
    const { name } = data[event.senderID];

    if (query) {
      api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
      const processingMessage = await api.sendMessage(
        `zer. Please wait a moment...
        \nไคล์|https://www.facebook.com/localhostsoriano`,
        event.threadID
      );

      const apiUrl = `https://lianeapi.onrender.com/@unregistered/api/khailesoriano?userName=${encodeURIComponent(name)}&key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        const trimmedMessage = response.data.message.trim();
        api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
        await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

        console.log(`Sent zer response to the user`);
      } else {
        throw new Error(`Invalid or missing response from zer API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get zer response: ${error.message}`);
    const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
    api.sendMessage(errorMessage, event.threadID);
  }
};
