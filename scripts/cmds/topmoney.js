 module.exports = {
  config: {
    name: "topmoney",
    aliases: ['tm','tb','topbal','topbalance'],
    version: "1.0",
    author: "Kyle",
    role: 0,
    shortDescription: {
      vi: "",
      en: "top 10 Billionaire user 💵"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "ECONOMY",
    guide: {
      vi: "",
      en: ""
    }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const allUsers = await usersData.getAll();
 
    const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 10);
 
    const topUsersList = topUsers.map((user, index) => `${index + 1}.👤${user.name}₱${user.money}💵`);
 
    const messageText = `࿇ ══━━━━✥◈✥━━━━══ ࿇\n𝙏𝙤𝙥 10 𝘽𝙞𝙡𝙡𝙞𝙤𝙣𝙖𝙞𝙧𝙚 𝙢𝙚𝙢𝙗𝙚𝙧𝙨 💵:\n${topUsersList.join('\n')}\n࿇ ══━━━━✥◈✥━━━━══ ࿇`;
 
    message.reply(messageText);
  }
};
