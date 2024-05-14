module.exports = {
 config: {
 name: "lc",
 version: "1.0",
 author: "Kylepogi", 
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "lastchat") {
 return message.reply({
 body: "════ஓ๑♡๑ஓ════\n\n    ✞︎ 𝐑.𝐈.𝐏 ✞︎\n\n ---------------\n  𝐂𝐀𝐔𝐒𝐄 𝐎𝐅 𝐃𝐄𝐀𝐓𝐇:\n    LAST CHAT\n 🕊️𝑖𝑛 𝑙𝑜𝑣𝑖𝑛𝑔 𝑚𝑒𝑚𝑜𝑟𝑖𝑒𝑠🕊️\n════ஓ๑♡๑ஓ════",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/sNsc0as.jpeg")
 });
 }
 }
}
