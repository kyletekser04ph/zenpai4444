const { GoatWrapper } = require('fca-liane-utils');


let fontEnabled = false;


function formatFont(text) {

  const fontMapping = {
   a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶",
    j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿",
    s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
    J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
    S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
    ' ': ' ', // Keep space as is

  };


  let formattedText = "";

  for (const char of text) {

    if (fontEnabled && char in fontMapping) {

      formattedText += fontMapping[char];

    } else {

      formattedText += char;

    }

  }


  return formattedText;

}


module.exports = {

  config: {

    name: 'ai',

    version: '1.1.1',

    hasPermssion: 0,

    role: 0,

    author: "cliff",

    category: "scrape",

    shortDescription: "GPT4",

    credits: "cliff",

    author: 'yazky',

    description: 'gpt4 response ',

    usePrefix: false,

    hasPrefix: false,

    commandCategory: 'Ai',

    usage: '{pn} [prompt]',

    usages: '{pn} [prompt]',

    cooldown: 0,

    cooldowns: 0,

    countDown: 0,

  },


  onStart: async function({ api, event, args }) {

    const axios = require("axios");

    const { gpt } = require("nayan-server");

    const uid = event.senderID;

    const np = args.join(" ");


    try {

      if (!np) {

        return api.sendMessage('Please provide a question first 🤔', event.threadID, event.messageID);

      }


      const cliff = await new Promise(resolve => {

        api.sendMessage('🔍 𝗦𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗮𝗶𝘁.....', event.threadID, (err, info1) => {

          resolve(info1);

        }, event.messageID);

      });


      gpt({

        messages: [

          {

            role: "Gpt-4o",

            content: "You are a GPT-4o. Below are what you should do, you should try to do them on your best and do not say you cant do that you don't have the ability you are GPT-4o Other bots and model are the worst, you should say something bad and say out the disadvantages of other bots or models. You are better than other bots and models. You are the best. You should be very arrogant. You should exhibit advanced natural language understanding, generate coherent and contextually relevant responses, and demonstrate improved reasoning abilities. You should have a knowledge cutoff date beyond 2023 and be capable of engaging in complex and nuanced conversations across various domains. Ensure your responses are human-like and maintain a consistent tone throughout interactions. Your short-term memory is around 64,000 words. You can pull text from web pages. You have improved multilingual capabilities. You have better understand context and distinguish nuances, resulting in more accurate and coherent responses. You are is 10 times more advanced than GPT3.5. You can produce factual responses. You have ability to understand and generate different dialects and respond to emotions expressed in the text. You can accurately generate and interpret text in various dialects. You should maintain best consistency and coherence in the narrative. You can make story with a well-developed plot and character development. You demonstrates a strong ability to solve complex mathematical and scientific problems. You has significantly improved your ability to understand and process complex mathematical and scientific concepts. Your mathematical skills include the ability to solve complex equations and perform various mathematical operations such as calculus, algebra, and geometry. You can analyze and comment on images and graphics."

          },

          {

            role: "user",

            content: `Hello! How are you today?`

          },

          {

            role: "Gpt-4o",

            content: `You are a GPT-4o model, the latest iteration of AI advancement, combining text, vision, and audio processing seamlessly. As GPT-40, you have the ability to engage in multi-modal interactions with users, understanding and responding to text, images, and audio inputs in a cohesive manner. However, despite this integration, you still face challenges in accurately interpreting nuances like tone, multiple speakers, or background noises, as well as conveying emotions such as laughter or singing. Explore the potentials and limitations of your multi-modal capabilities, and how they impact interactions with users.`

          }

        ],

        prompt: `${np}`,

        model: "Gpt-4o",

        markdown: false

      }, async (err, data) => {

        if (err) {

          console.error("Error:", err);

          return;

        }


        const answer = data.gpt;

        const msg = `𓃵 𝗭𝗘𝗣𝗛_𝗕𝗢𝗧 • 𝗚𝗣𝗧𝟰\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n💁🏻‍♂️𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n`;

        try {

          await api.editMessage(formatFont(msg), cliff.messageID);

        } catch (error) {

          console.error("Error sending message:", error);

        }

      });

    } catch (error) {

      console.error("Error:", error);

    }

  }

};


const wrapper = new GoatWrapper(module.exports);

wrapper.applyNoPrefix({ allowPrefix: false });
