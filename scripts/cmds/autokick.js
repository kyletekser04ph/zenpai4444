let messageCounts = {};
let spamDetectionEnabled = true;
const SPAM_THRESHOLD = 5;
const SPAM_INTERVAL_MS = 120000; // 2 minutes in milliseconds

module.exports = {
  config: {
    name: "spamkick",
    aliases: ["autokick"],
    version: "1.0",
    author: "Kyle",
    role: 0,
    category: "⚠️ 𝗔𝗻𝘁𝗶𝘀𝗽𝗮𝗺."
  },

  toggleSpamDetection: function () {
    spamDetectionEnabled = !spamDetectionEnabled;
    return spamDetectionEnabled
      ? "⚠️ | 𝗦𝗽𝗮𝗺 𝗱𝗲𝘁𝗲𝗰𝘁𝗶𝗼𝗻!!\n▬▬▬▬▬▬▬▬▬▬▬▬\n 🟢 Now enabled.\n▬▬▬▬▬▬▬▬▬▬▬▬"
      : "⚠️ | 𝗦𝗽𝗮𝗺 𝗱𝗲𝘁𝗲𝗰𝘁𝗶𝗼𝗻!!\n▬▬▬▬▬▬▬▬▬▬▬▬\n 🔴 Now disabled.\n▬▬▬▬▬▬▬▬▬▬▬▬";
  },

  onStart: function ({ api, event }) {
    const { threadID, senderID, isAdmin } = event;

    if (!spamDetectionEnabled) return;

    if (!messageCounts[threadID]) {
      messageCounts[threadID] = {};
    }

    const userStats = messageCounts[threadID][senderID];

    if (!userStats) {
      messageCounts[threadID][senderID] = {
        count: 1,
        timer: setTimeout(() => {
          delete messageCounts[threadID][senderID];
        }, SPAM_INTERVAL_MS)
      };
    } else {
      userStats.count++;
      if (userStats.count > SPAM_THRESHOLD) {
        if (isAdmin) {
          api.removeUserFromGroup(senderID, threadID);
          api.sendMessage({
            body: `⚠️ | 𝗗𝗲𝘁𝗲𝗰𝘁𝗲𝗱 𝘀𝗽𝗮𝗺𝗺𝗶𝗻𝗀凸( •̀_•́ )凸\n▬▬▬▬▬▬▬▬▬▬▬▬\n 💁🏻‍♂️ User has been kicked from the group due to spamming.\n▬▬▬▬▬▬▬▬▬▬▬▬`,
            mentions: [{ tag: senderID, id: senderID }]
          }, threadID);
        } else {
          api.removeUserFromGroup(api.getCurrentUserID(), threadID);
          api.sendMessage("⚠️ | 𝗗𝗲𝘁𝗲𝗰𝘁𝗲𝗱 𝘀𝗽𝗮𝗺𝗺𝗶𝗻𝗀凸( •̀_•́ )凸\n▬▬▬▬▬▬▬▬▬▬▬▬\n💁🏻‍♂️ The bot has left the group due to spamming.\n▬▬▬▬▬▬▬▬▬▬▬▬", threadID);
        }
        delete messageCounts[threadID][senderID];
      }
    }
  }
};
