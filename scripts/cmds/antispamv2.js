const axios = require('axios');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "antispamv2",
    version: "1.0.0",
    author: "Kyle",
    countDown: 5,
    role: 0,
    shortDescription: "Ban user for spamming",
    longDescription: "Bans user for spamming and then automatically unbans them",
    category: "owner",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const num = 5; // Number of spam messages before banning
    const timee = 60; // Time window for spam detection in seconds

    const message = `⚠️ | 𝗗𝗘𝗧𝗘𝗖𝗧 𝗦𝗣𝗔𝗠𝗠𝗜𝗡𝗚凸( •̀_•́ )凸\n▬▬▬▬▬▬▬▬▬▬▬▬\n 💁🏻‍♂️ Automatically ban users if they spam ${num} times\nTime window: ${timee}s\n▬▬▬▬▬▬▬▬▬▬▬▬`;
    return api.sendMessage(message, event.threadID, event.messageID);
  },

  handleEvent: async function ({ Users, Threads, api, event, global }) {
    const { senderID, threadID } = event;
    const num = 5; // Number of spam messages before banning
    const timee = 60; // Time window for spam detection in seconds
    const timeLimit = timee * 1000;

    const { threadInfo } = await Threads.getData(threadID);
    const threadSetting = global.data.threadData.get(threadID) || {};
    const prefix = threadSetting.PREFIX || global.config.PREFIX;

    if (!event.body || !event.body.startsWith(prefix)) return;

    if (!global.client.autoban) global.client.autoban = {};
    if (!global.client.autoban[senderID]) {
      global.client.autoban[senderID] = { timeStart: Date.now(), number: 0 };
    }

    const userData = global.client.autoban[senderID];
    if (Date.now() - userData.timeStart > timeLimit) {
      userData.timeStart = Date.now();
      userData.number = 0;
    } else {
      userData.number++;
      if (userData.number >= num) {
        const timeDate = moment.tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss");
        let dataUser = await Users.getData(senderID) || {};
        let data = dataUser.data || {};
        
        if (data.banned) return;

        data.banned = true;
        data.reason = `\n\nSpam bot ${num} times/${timee}s\n\n`;
        data.dateAdded = timeDate;
        await Users.setData(senderID, { data });
        
        global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });

        api.sendMessage(
          `${senderID} \nName: ${dataUser.name} ⚠️ 𝗦𝗣𝗔𝗠𝗠𝗜𝗡𝗚 𝗗𝗘𝗧𝗘𝗖𝗧\n▬▬▬▬▬▬▬▬▬▬▬▬\nReason: Spam bot ${num} times\nAutomatically unban after ${timee} seconds\n\nReport sent to admins\n\n▬▬▬▬▬▬▬▬▬▬▬▬`,
          threadID,
          () => {
            const adminBots = global.config.ADMINBOT;
            adminBots.forEach(ad => {
              api.sendMessage(
                `⚠️ 𝗦𝗣𝗔𝗠𝗠𝗜𝗡𝗚 𝗗𝗘𝗧𝗘𝗖𝗧\n▬▬▬▬▬▬▬▬▬▬▬▬\nSpam ban notification\n\nSpam offenders ${num}/${timee}s\nName: ${dataUser.name} \nUser ID: ${senderID}\nGroup ID: ${threadID}\nGroup Name: ${threadInfo.threadName}\nTime: ${timeDate}\n\n▬▬▬▬▬▬▬▬▬▬▬▬`,
                ad
              );
            });
          }
        );

        // Reset spam counter
        userData.timeStart = Date.now();
        userData.number = 0;
      }
    }
  }
};
