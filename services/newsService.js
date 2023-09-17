const axios = require('axios');

const apiUrl = 'https://newsapi.org/v2/top-headlines';

async function topNews() {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                country: 'in',
                apiKey: process.env.NEWS_API_KEY,
            },
        });

        const articles = response.data.articles;
        const simplifiedArticles = articles.map(article => ({
            title: article.title,
            description: article.description,
        }));

        return simplifiedArticles;
    } catch (error) {
        console.error('Error fetching top headlines in India:', error);
        throw error;
    }
}

module.exports = topNews;
