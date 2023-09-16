const express = require('express')
const path = require('path')

const virtualController = require('../controllers/assistantController')

const router = express.Router()

router.post('/virtualAssistant', virtualController.virtualAssistant)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'views', 'mainPage.html'));
});

module.exports = router
