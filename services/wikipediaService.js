const axios = require('axios');
const cheerio = require('cheerio');

async function searchWikipedia(query, maxLines = 5) {
    try {
        const apiUrl = `https://en.wikipedia.org/w/api.php`;
        const response = await axios.get(apiUrl, {
            params: {
                action: 'query',
                list: 'search',
                srsearch: query,
                format: 'json',
            },
        });
        const title = response.data.query.search[0].title;
        const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
        const pageResponse = await axios.get(pageUrl);
        const $ = cheerio.load(pageResponse.data);
        const fullText = $('p').text();
        const lines = fullText.split('\n').slice(0, maxLines);
        return {
            content: lines.join('\n'),
        };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = searchWikipedia;
