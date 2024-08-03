module.exports = {
	config: {
			name: "=",
			version: "1.0",
			author: "Kylepogi",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "=") return message.reply("⛔•𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗\n\n𝘗𝘭𝘦𝘢𝘴𝘦 𝙏𝙮𝙥𝙚 =help 𝘵𝘰 𝘴𝘦𝘦 𝘮𝘺 𝘈𝘭𝘭 𝘈𝘷𝘢𝘪𝘭𝘢𝘣𝘭𝘦 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨(◍•ᴗ•◍)");
}
};
