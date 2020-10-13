const express = require('express')
const app = express()

// will use ngrok to listen to localhost from phone

app.get('/', (req, res, next) => {
    try {
        res.send('hi')
    } catch (error) {
        console.error(error)
    }
})

app.get('/phone', (req, res, next) => {
    try {
        console.log('RECEIVED')
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
    }
})



PORT = 8080
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
