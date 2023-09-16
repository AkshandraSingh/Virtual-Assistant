require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');

const virtualRouter = require('./routes/virtualRoute')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', virtualRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`Server Link http://localhost:${PORT}`);
})
