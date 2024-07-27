const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "resend",
    version: "1.0.0",
};

const msgData = {};

module.exports.handleEvent = async function ({ api, event }) {
    if (event.type === 'message') {
        // Store message details for later use
        msgData[event.messageID] = {
            body: event.body,
            attachments: event.attachments
        };
    } else if (event.type === 'message_unsend' && msgData[event.messageID]) {
        // Get user info
        const info = await api.getUserInfo(event.senderID);
        const name = info[event.senderID].name;

        // Define a function to handle file operations
        const handleFile = async (url, filename, type) => {
            const { data } = await axios.get(url, { responseType: 'arraybuffer' });
            const filePath = path.join(__dirname, 'cache', filename);
            fs.writeFileSync(filePath, Buffer.from(data));
            return fs.createReadStream(filePath);
        };

        const attachments = msgData[event.messageID].attachments;
        if (attachments.length === 0) {
            api.sendMessage(`${name} unsent this message: ${msgData[event.messageID].body}`, event.threadID);
        } else {
            let attachmentsToSend = [];
            let filesToDelete = [];

            for (const attachment of attachments) {
                let filename;
                if (attachment.type === 'photo') {
                    filename = `${attachment.filename}.jpg`;
                } else if (attachment.type === 'audio') {
                    filename = 'audio.mp3';
                } else if (attachment.type === 'animated_image') {
                    filename = 'animated_image.gif';
                }

                if (filename) {
                    const file = await handleFile(attachment.url || attachment.previewUrl, filename, attachment.type);
                    attachmentsToSend.push(file);
                    filesToDelete.push(path.join(__dirname, 'cache', filename));
                }
            }

            const messageBody = `${name} unsent this ${attachments[0].type}: ${msgData[event.messageID].body}`;
            api.sendMessage({ body: messageBody, attachment: attachmentsToSend }, event.threadID, () => {
                filesToDelete.forEach(file => fs.unlinkSync(file));
            });
        }
    }
};
