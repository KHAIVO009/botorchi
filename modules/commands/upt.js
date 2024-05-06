const os = require("os");
const fs = require("fs-extra");

// Capture the bot's start time
const startTime = new Date();

module.exports.config = {
  name: "uptime",
  version: "0.0.1",
  hasPermission: 0,
  credits: "khaile",
  description: "Retrieve system information and check server latency.",
  usePrefix: false,
  commandCategory: "system",
  usages: "check info",
  cooldowns: 0,
};

module.exports.run = ({ api, event, send }) => {
  try {
    const milliseconds = process.uptime() * 1000;
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const loadAverage = os.loadavg();
    const cpuUsage =
      os
        .cpus()
        .map((cpu) => cpu.times.user)
        .reduce((acc, curr) => acc + curr) / os.cpus().length;

    const totalMemoryGB = os.totalmem() / 1024 ** 3;
    const freeMemoryGB = os.freemem() / 1024 ** 3;
    const usedMemoryGB = totalMemoryGB - freeMemoryGB;

    const systemInfo = `♡   ∩_∩
 （„• ֊ •„)♡
╭─∪∪───────────⟡
│     𝚄𝙿𝚃𝙸𝙼𝙴 𝚂𝚈𝚂𝚃𝙴𝙼
├──────────────⟡
│✧ 𝙱𝙾𝚃 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 ✧
│ 𝙽𝙰𝙼𝙴: ไคล์
│ 𝙻𝙰𝙽𝙶: 𝙽𝚘𝚍𝚎𝚓𝚜
│ 𝙿𝚁𝙵𝚇: .
│ 𝙳𝙴𝚅𝚂: khaile
├──────────────⟡
│ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 | 𝚄𝙿𝚃𝙸𝙼𝙴𝙳
│  ${uptimeFormatted}
├──────────────⟡
│𝙾𝚂: ${os.type()} ${os.arch()}
│𝙻𝙰𝙽𝙶 𝚅𝙴𝚁: ${process.version}
│𝙲𝙿𝚄 𝙼𝙾𝙳𝙻: ${os.cpus()[0].model}
│𝚂𝚃𝙾𝚁𝙰𝙶𝙴: ${usedMemoryGB.toFixed(2)} GB / ${totalMemoryGB.toFixed(2)} GB
│𝙲𝙿𝚄 𝚄𝚂𝙶𝙴: ${cpuUsage.toFixed(1)}%
│𝚁𝙰𝙼 𝚄𝚂𝙶𝙴: ${process.memoryUsage().heapUsed / 1024 / 1024} MB;
╰──────────────⟡
`;

    // Send message with attachment if it exists
    const attachmentPath = __dirname + '/cache/info.mp4';
    if (fs.existsSync(attachmentPath)) {
      const attachment = fs.createReadStream(attachmentPath);
      api.sendMessage({
        body: systemInfo,
        attachment: attachment
      }, event.threadID, (err, messageInfo) => {
        if (err) {
          console.error("Error sending message with attachment:", err);
        } else {
          console.log("Message with attachment sent successfully:", messageInfo);
        }
      });
    } else {
      api.sendMessage(
        "Unable to find the attachment file.",
        event.threadID
      );
    }
  } catch (error) {
    console.error("Error retrieving system information:", error);
    api.sendMessage(
      "Unable to retrieve system information.",
      event.threadID
    );
  }
};
