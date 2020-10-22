const express = require('express')
const morgan = require('morgan')
const app = express()
const { PythonShell } = require('python-shell')

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

const delim = '!!^&*#(@)!!'
app.post('/sd_api', async (req, res, next) => {
  try {
    console.log('HEY WHAT IS UP')
    let pyshell = new PythonShell('script.py')
    pyshell.send(req.body.base64)
    pyshell.on('message', function (message) {
      // message format: "['book1', 'book2']". unique delimeter: !!^&*#(@)!!
      message = message.slice(2, -2)
      message = message.split(`${delim}', '`)
      message[message.length - 1] = message[message.length - 1].slice(
        0,
        -delim.length
      )
      res.json({ message })
    })
  } catch (error) {
    console.error(error)
  }
})

PORT = 3000
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
