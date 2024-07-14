const allOnEvent = global.GoatBot.onEvent;

const fs = require("fs");
const cron = require("node-cron");
const greetings = {
  every5minutes: [
    { time: "5minutes", message: "𝗗𝗼𝗻'𝘁 𝗳𝗼𝗿𝗴𝗲𝘁  𝘁𝗼  𝗮𝗱𝗱/𝗙𝗼𝗹𝗹𝗼𝘄 𝗺𝘆 𝗯𝗼𝘀𝘀 𝗞𝘆𝗹𝗲.\n\n𝗉𝖺𝗋𝖺 𝗄𝖾𝖾𝗉 𝗎𝗉𝖽𝖺𝗍𝖾 𝗄𝖺 𝗇𝗂 𝖹𝖾𝗉𝗁 𝖡𝗈𝗍.\n\n🔗𝗙𝗕𝗹𝗶𝗻𝗸: https://www.facebook.com/kyledev03" },
    ], 
  morning: [
    { time: "7:35 AM", message: "Good morning! ☀️ How about starting the day with a delicious breakfast?" },
    { time: "8:30 AM", message: "Rise and shine! It's breakfast time! 🍳☕" },
    { time: "9:00 AM", message: "Morning vibes! Anyone up for a breakfast feast?" },
  ],
  lunchtime: [
    { time: "12:00 PM", message: "It's lunchtime, my friends! Let's gather for a tasty meal." },
    { time: "12:30 PM", message: "Hungry yet? Lunch plans anyone?" },
    { time: "1:00 PM", message: "Lunch break! Who's in for some good food and great company?" },
  ],
  afternoonSnack: [
    { time: "3:00 PM", message: "Time for a snack break! Join me for some treats?" },
    { time: "3:30 PM", message: "Feeling a bit peckish? Snacks and chit-chat await!" },
    { time: "4:00 PM", message: "Afternoon delight: Snacks, laughter, and fun!" },
  ],
  eveningDinner: [
    { time: "6:00 PM", message: "Dinner plans tonight? Let's enjoy a hearty meal together." },
    { time: "7:36 PM", message: "Evening has come, and so has the dinner bell! 🍽️" },
    { time: "7:00 PM", message: "Dinner is served! Who's joining me at the table?" },
  ],
  lateNightSnack: [
    { time: "11:00 PM", message: "Late-night munchies? Come on over for some snacks!" },
    { time: "11:30 PM", message: "Midnight snack run, anyone? Let's satisfy those cravings." },
    { time: "12:00 AM", message: "Burning the midnight oil? Grab a snack and keep me company." },
  ],
};

module.exports = {
  config: {
    name: "autogreet",
    version: "1.1",
    author: "Zed | Fixed by Liane",
    description: "Autogreeting",
    category: "events"
  },

  onStart: async ({ api, args, message, event, threadsData, usersData, dashBoardData, threadModel, userModel, dashBoardModel, role, commandName }) => {

    cron.schedule('*/5 * * * *', () => {
      sendRandomGreeting(greetings.every5minutes);
    });
    cron.schedule('0 8 * * *', () => {
      sendRandomGreeting(greetings.morning);
    });

    cron.schedule('0 12 * * *', () => {
      sendRandomGreeting(greetings.lunchtime);
    });

    cron.schedule('0 15 * * *', () => {
      sendRandomGreeting(greetings.afternoonSnack);
    });

    cron.schedule('0 18 * * *', () => {
      sendRandomGreeting(greetings.eveningDinner);
    });

    cron.schedule('0 23 * * *', () => {
      sendRandomGreeting(greetings.lateNightSnack);
    });
    
    async function sendRandomGreeting(greetingArray) {
      const randomIndex = Math.floor(Math.random() * greetingArray.length);
      const { time, message } = greetingArray[randomIndex];
      const allThreads = await threadsData.getAll();
      for (const { threadID } of allThreads) {
        try {
        await api.sendMessage(`🛎 | 𝗔𝗨𝗧𝗢 𝗚𝗥𝗘𝗘𝗧𝗜𝗡𝗚𝗦(≧∇≦)/\n▬▬▬▬▬▬▬▬▬▬▬▬\n [ ${time} ] — ${message}\n▬▬▬▬▬▬▬▬▬▬▬▬`, threadID);
        } catch (error) {
          continue;
        }
      }
    }
  }
};
