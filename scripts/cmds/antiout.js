module.exports = {
  config: {
    name: "antiout",
    version: "1.0",
    author: "AceGun x Kylepogi",//recode by Kyle and modified
    countDown: 0,
    role: 2,
    shortDescription: "Enable or disable antiout",
    longDescription: "",
    category: "box chat",
    guide: "{pn} {{[on | off]}}",
    envConfig: {
      deltaNext: 5
    }
  },

  onStart: async function({ message, event, threadsData, args }) {
    try {
      // Retrieve and initialize antiout setting if needed
      let antiout = await threadsData.get(event.threadID, "settings.antiout");
      if (typeof antiout === "undefined") {
        antiout = true;
        await threadsData.set(event.threadID, antiout, "settings.antiout");
      }

      // Validate the action argument
      const action = args[0];
      if (!["on", "off"].includes(action)) {
        return message.reply("Please use 'on' or 'off' as an argument.");
      }

      const newStatus = action === "on";
      await threadsData.set(event.threadID, newStatus, "settings.antiout");
      return message.reply(`Antiout has been ${newStatus ? "enabled" : "disabled"}.`);
    } catch (error) {
      console.error('Error in onStart:', error);
      return message.reply('An error occurred while processing your request.');
    }
  },

  onEvent: async function({ api, event, threadsData }) {
    try {
      const antiout = await threadsData.get(event.threadID, "settings.antiout");
      if (antiout && event.logMessageData?.leftParticipantFbId) {
        const userId = event.logMessageData.leftParticipantFbId;
        const threadInfo = await api.getThreadInfo(event.threadID);

        if (!threadInfo.participantIDs.includes(userId)) {
          const userName = await api.getUserName(userId); // Ensure this function is defined in your API module
          const success = await api.addUserToGroup(userId, event.threadID);

          const message = success
            ? `✅ Active antiout mode!!\n▬▬▬▬▬▬▬▬▬\n🙂 wala kang takas nigga ${userName} — (${userId}) has been re-added to the group!`
            : `❌ Unable to re-add member!!\n▬▬▬▬▬▬▬▬▬\n ${userName} — (${userId}) to the group.`;
          
          api.sendMessage(message, event.threadID);
        }
      }
    } catch (error) {
      console.error('Error in onEvent:', error);
    }
  }
};
