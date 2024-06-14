module.exports = {
  config: {
    name: 'spam3',
    aliases: ['Spam3'],
    version: '1.1',
    author: 'Eugene Aguilar',
    countDown: 2,
    role: 2,
    shortDescription: 'spam a message multiple times and optionally change group chat name',
    longDescription: 'Spam a message multiple times to a specified group chat and optionally change the group chat name before spamming',
    category: 'fun',
    guide: '{pn} [group_tid] [gc_name_change] [message_amount] [message]',
  },

  onStart: async function ({ api, event, args }) {
    // Check if the correct number of arguments are provided
    if (args.length < 4) {
      return api.sendMessage(`Invalid usage. Usage: /spam [group_tid] [gc_name_change] [message_amount] [message]`, event.threadID);
    }

    const groupTID = args[0]; // Target group thread ID
    const newGCName = args[1]; // New group chat name
    const messageAmount = parseInt(args[2]); // Number of times to send the message
    const message = args.slice(3).join(" "); // Message to be sent

    // Validate the amount
    if (isNaN(messageAmount) || messageAmount <= 0) {
      return api.sendMessage(`Invalid amount. Usage: /spam [group_tid] [gc_name_change] [message_amount] [message]`, event.threadID);
    }

    // Change the group chat name
    api.setTitle(newGCName, groupTID, (err) => {
      if (err) {
        return api.sendMessage(`Failed to change the group chat name to ${newGCName}.`, event.threadID);
      }

      // Spam the message to the specified group chat
      for (let i = 0; i < messageAmount; i++) {
        api.sendMessage(message, groupTID, (err) => {
          if (err) {
            return api.sendMessage(`Failed to send message to the group chat with ID ${groupTID}.`, event.threadID);
          }
        });
      }
    });
  },
};
