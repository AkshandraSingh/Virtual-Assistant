const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


async function callChatGPT(text) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: text }],
            model: "gpt-3.5-turbo",
        });
        return chatCompletion.choices[0].message.content
    } catch (error) {
        console.log(error)
    }

}

module.exports = callChatGPT
