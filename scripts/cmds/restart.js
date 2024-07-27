const fs = require("fs-extra");

module.exports = {
	config: {
		name: "res",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "♻️ | 『𝗭𝗲𝗽𝗵𝘆𝗿𝘂𝘀 𝗕𝗼𝘁』\n▬▬▬▬▬▬▬▬▬▬▬▬\n𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...\n▬▬▬▬▬▬▬▬▬▬▬▬"
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`✅ | 𝗕𝗼𝘁 𝗿𝗲𝘀𝘁𝗮𝗿𝘁𝗲𝗱:\n▬▬▬▬▬▬▬▬▬▬▬▬\n⏰ | 𝗧𝗶𝗺𝗲: ${(Date.now() - time) / 1000}s\n▬▬▬▬▬▬▬▬▬▬▬▬`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};
