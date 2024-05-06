const axios = require('axios');

module.exports["config"] = {
  name: "cofi",
  version: "1.0.0",
  credits: "khaile",
  hasPermission: 0,
  commandCategory: "Ai-Chat",
  usage: "[cofi] prompt]",
  usePrefix: false,
  cooldown: 0
};

module.exports["run"] = async ({ api, event, args }) => {
  try {
    const query = args.join(" ") || "hello";
    const data = await api.getUserInfo(event.senderID);
    const { name } = data[event.senderID];

    if (query) {
      api.setMessageReaction("", event.messageID, (err) => console.log(err), true);

      const apiUrl = `https://lianeapi.onrender.com/@unregistered/api/jea2?userName=${encodeURIComponent(name)}&key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        const trimmedMessage = response.data.message.trim();
        api.setMessageReaction("", event.messageID, (err) => console.log(err), true);
        await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

        console.log(`Sent cofi's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from cofi API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get cofi's response: ${error.message}`);
    const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
    api.sendMessage(errorMessage, event.threadID);
  }
};
