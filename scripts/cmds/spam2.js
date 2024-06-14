module.exports = {
  config: {
    name: "spam2",
    author: "kim/zed",
    role: 2,
    shortDescription: "",
    longDescription: "",
    category: "sophia",
    guide: "{pn}"
  },
  onStart: async function ({ api, event, args, usersData, getLang }) {
    const amount = parseInt(args[0]);
    const message = args.slice(1).join(" ");
    
    if (isNaN(amount) || !message) {
      return api.sendMessage("Invalid usage. Usage: /spam [amount] [message]", event.threadID);
    }

    const permission = ["100052395031835"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only My Boss Kyle Bait-it can do it.",
        event.threadID,
        event.messageID
      );
    }

    for (let i = 0; i < amount; i++) {
      api.sendMessage(message, event.threadID);
    }
  }
};
