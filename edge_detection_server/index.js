const express = require('express')
const morgan = require('morgan')
const app = express()

// will use ngrok to listen to localhost from phone

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

PORT = 3000
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
