module.exports = {
  config: {
    name: "kylesupportgc",
    version: "1.0",
    author: "Kylepogi",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add user to support group",
    },
    longDescription: {
      en: "This command adds the user to the admin support group.",
    },
    category: "support",
    guide: {
      en: "⚠️ To use this command, simply type support.",
    },
  },

  // onStart is a function that will be executed when the command is executed
  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = "6934711683285483"; // ID of the support group

    const threadID = event.threadID;
    const userID = event.senderID;

    // Check if the user is already in the support group
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      // User is already in the support group
      api.sendMessage(
        "🤗 You are already in the kylesupport group. If you didn't find it, please check your message requests or spam box.",
        threadID
      );
    } else {
      // Add user to the support group
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("⛔ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗜𝗡𝗜𝗘𝗗. Failed to add user to support group:\n", err);
          api.sendMessage("⚠️ I can't add you because your id is not allowed message request or your account is private. please add me then try again...", threadID);
        } else {
          api.sendMessage(
            "🟢 𝗦𝗨𝗖𝗖𝗘𝗦𝗦.  You have been added to the admin support group. If you didn't find the box in your inbox, please check your message requests or spam box.",
            threadID
          );
        }
      });
    }
  },
};
