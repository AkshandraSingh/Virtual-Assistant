const say = require('say');
const searchWikipedia = require('../services/wikipediaService');

module.exports = {
    virtualAssistant: async (req, res) => {
        try {
            const { text } = req.body;
            let search = text.toLowerCase();
            if (search.startsWith('search on wikipedia ')) {
                search = search.replace('search on wikipedia ', ''); // ! Remove search on wikipedia to string .
                const wikipediaData = await searchWikipedia(search);
                const wikipediaContent = wikipediaData.content;
                console.log(wikipediaContent);
                await say.speak(wikipediaContent);
            } else if (search === 'stop') {
                say.stop()
            }
            else {
                say.speak("Sorry, Not Found");
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
