const { getStreamFromURL } = require("fb-watchman");
module.exports = {
  config: {
    name: "info",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "0info about bot and owner",
    category: "ai",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "https://i.imgur.com/oeF21Tq.gif";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;

    const ment = [{ id: id, tag: name }];
    const a = "𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗔𝗜🇵🇭";
    const b = " = ";
    const c = "𝗞𝗬𝗟𝗘 𝗕𝗔𝗜𝗧-𝗜𝗧";
const e = "Male";
    const d = "me.m/itssmekylebaitit";
const f = "itssmekylebaitit";
const g = "𝗥𝗘𝗟𝗔𝗧𝗜𝗢𝗡𝗦𝗛𝗜𝗣 𝗪𝗜𝗧𝗛 𝗟𝗔𝗜𝗡𝗘";

    message.reply({ 
      body: `${name}, here is the information😉
❏ Bot's Name: ${a}
❏ Bot's prefix: ${b}  
❏ Owner: ${c}
❏ Gender: ${e}
❏ Messenger: ${d}
❏ Insta: ${f}
❏ Relationship: ${g}`,
mentions: ment,
      attachment: attachment });
  }
};
