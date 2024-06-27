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
	if (event.body && event.body.toLowerCase() == "=") return message.reply("⚠ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗 𝑝𝑙𝑒𝑎𝑠𝑒 𝑇𝑦𝑝𝑒 =help 𝑡𝑜 𝑠𝑒𝑒 𝐴𝑣𝑎𝑖𝑙𝑎𝑏𝑙𝑒 𝐶𝑜𝑚𝑚𝑎𝑛𝑑𝑠(⋋▂⋌)\n￣￣￣￣＼／￣￣￣\n              ∧＿∧\n     ;;（´・ω・）\n  ＿旦_(っ(,,■)＿＿\n   |l￣l||￣しﾞしﾞ￣| ");
}
};
