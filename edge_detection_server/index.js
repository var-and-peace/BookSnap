const express = require('express')
const morgan = require('morgan')
const app = express()
const { PythonShell } = require('python-shell')

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  try {
    res.send('hi')
  } catch (error) {
    console.error(error)
  }
})

app.post('/phone', async (req, res, next) => {
  try {
    let pyshell = new PythonShell('script.py')
    console.log(req.body)
    pyshell.send(req.body.base64)
    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message, typeof message)
      res.json({ message })
    })
    console.log('closing WARNING')
  } catch (error) {
    console.error(error)
  }
})

PORT = 3000
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
