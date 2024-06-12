const moment = require("moment-timezone");
const manilaTime = moment.tz('Asia/Manila');
const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
 const axios = require('axios');
const { GoatWrapper } = require('fca-liane-utils');

let fontEnabled = true;

function formatFont(text) { 
  const fontMapping = {
            'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
      'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲',
      'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
      'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏',
      'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘',
      'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
  };

  let formattedText = "";
  for (const char of text) {
    if (fontEnabled && char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports = {
  config: {
    name: "meta3",
    version: "4.7",
    hasPermission: 0,
    role: 0,
    aliases: ["meta","ai"],
    credits: "hashier",
    shortDescription: "(𝙼𝚎𝚝𝚊 𝙻𝚕𝚊𝚖𝚊 3)",
    description: "(𝙼𝚎𝚝𝚊 𝙻𝚕𝚊𝚖𝚊 3)",
    commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
    hasPrefix: false,
    usePrefix: false,
    usages: "(𝙼𝚘𝚍𝚎𝚕 - 𝙼𝚎𝚝𝚊/𝚕𝚕𝚊𝚖𝚊3 70𝚋 𝙸𝚗𝚜𝚝𝚛𝚞𝚌𝚝)",
    usage: "(𝙼𝚘𝚍𝚎𝚕 - 𝙼𝚎𝚝𝚊/𝚕𝚕𝚊𝚖𝚊3 70𝚋 𝙸𝚗𝚜𝚝𝚛𝚞𝚌𝚝)",
    cooldowns: 3,
    cooldown: 3,
    category: "Noprefix",
    countDown: 5,
  },

  onStart: async function ({ api, event, args }) {
    if (args.length === 0) {
      api.sendMessage({ body: "🔮 𝙷𝚎𝚕𝚕𝚘, 𝙸 𝚊𝚖 𝙼𝚎𝚝𝚊/𝚕𝚕𝚊𝚖𝚊3 𝙲𝚛𝚎𝚊𝚝𝚎𝚍 𝚋𝚢 𝙼𝚎𝚝𝚊 𝙰𝙸\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?" }, event.threadID);
      return;
    }

    const command = args[0].toLowerCase();
    if (command === "on") {
      fontEnabled = true;
      api.sendMessage({ body: "🔮 𝐌𝐞𝐭𝐚/𝐋𝐥𝐚𝐦𝐚3 (𝐀𝐈)\n\n» 🟢 𝙵𝚘𝚗𝚝 𝙵𝚘𝚛𝚖𝚊𝚝𝚝𝚒𝚗𝚐 𝚒𝚜 𝚗𝚘𝚠 𝙴𝚗𝚊𝚋𝚕𝚎𝚍 «" }, event.threadID, event.messageID);
    } else if (command === "off") {
      fontEnabled = false;
      api.sendMessage({ body: "🔮 𝐌𝐞𝐭𝐚/𝐋𝐥𝐚𝐦𝐚3 (𝐀𝐈)\n\n» 🔴 𝙵𝚘𝚗𝚝 𝙵𝚘𝚛𝚖𝚊𝚝𝚝𝚒𝚗𝚐 𝚒𝚜 𝚗𝚘𝚠 𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍 «" }, event.threadID, event.messageID);
    } else {
      const content = args.join(" ");

      try {
        api.sendMessage({ body: "🗨 | 𝙼𝚎𝚝𝚊 𝙰𝙸 𝚒𝚜 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚛 𝚊𝚗𝚜𝚠𝚎𝚛, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝..." }, event.threadID, event.messageID);

        const response = await axios.get(`https://ai-1stclass-nemory-project.vercel.app/api/llama?ask=${encodeURIComponent(content)}`);

        if (response.data && response.data.response) {
          const formattedContent = formatFont(response.data.response);
          api.sendMessage({ body: `🔮 𝐌𝐞𝐭𝐚/𝐋𝐥𝐚𝐦𝐚3—(𝐀𝐈)\n\n𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻❓: “${content}“\n❍━━━━━━━━━━━━━━━❍📆 | ⏰ 𝗗𝗔𝗧𝗘 𝗔𝗡𝗗 𝗧𝗜𝗠𝗘 :\n${formattedDateTime}\n\n💬𝗔𝗡𝗦𝗪𝗘𝗥: ${formattedContent}\n❍━━━━━━━━━━━━━━━❍` }, event.threadID, event.messageID);
        } else {
          console.error('🚫 𝙴𝚛𝚛𝚘𝚛: 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙼𝚎𝚝𝚊 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚘𝚛𝚖𝚊𝚝');
          api.sendMessage({ body: '🚫 𝙴𝚛𝚛𝚘𝚛: 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝙼𝚎𝚝𝚊 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚘𝚛𝚖𝚊𝚝' }, event.threadID, event.messageID);
        }
      } catch (error) {
        console.error('🚫 𝙴𝚛𝚛𝚘𝚛:', error.message);
        api.sendMessage({ body: '🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍' }, event.threadID, event.messageID);
      }
    }
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: false });
