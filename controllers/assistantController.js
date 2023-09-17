const say = require('say');
const opn = require('opn');

const searchWikipedia = require('../services/wikipediaService');
const callChatGPT = require('../services/gptService')

module.exports = {
    virtualAssistant: async (req, res) => {
        try {
            const { text } = req.body;
            let search = text.toLowerCase();

            if (search.startsWith('search on wikipedia ')) {
                search = search.replace('search on wikipedia ', ''); // Remove "search on wikipedia" from the string.
                const wikipediaData = await searchWikipedia(search);
                if (wikipediaData && wikipediaData.content) {
                    const wikipediaContent = wikipediaData.content;
                    console.log(wikipediaContent);
                    await say.speak(wikipediaContent);
                } else {
                    say.speak("No results found on Wikipedia.");
                }
            } else if (search === 'stop') {
                say.stop();
            } else if (search === 'open youtube') {
                say.speak('Opening youtube')
                await opn('https://www.youtube.com/');
            } else if (search === 'open chat gpt') {
                say.speak('Opening chat gpt')
                await opn('https://chat.openai.com/');
            } else if (search === 'open google') {
                say.speak('Opening google')
                await opn('https://www.google.com/');
            } else if (search === 'open github') {
                say.speak('Opening gitHub')
                await opn('https://github.com/ishansingh1010')
            }
            else if (search === 'open instagram') {
                say.speak('Opening Instagram')
                await opn('https://www.instagram.com/')
            } else if (search === "hey assistant") {
                say.speak("Hello! Ishan, How I can help you")
            }
            else {
                const chatGptResponse = await callChatGPT(search)
                console.log(chatGptResponse)
                say.speak(chatGptResponse)
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    }
};
