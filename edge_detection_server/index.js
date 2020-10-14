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

app.put('/phone', async (req, res, next) => {
  try {
    // let options = {
    //   mode: 'text',
    //   pythonOptions: ['-u'], // get print results in real-time
    //   args: [req.body.base64]
    // }
    // PythonShell.run('script.py', options, function (err, results) {
    //   if (err) throw err
    //   // results is an array consisting of messages collected during execution
    //   console.log('results: %j', results)
    // })
    let pyshell = new PythonShell('script.py')
    pyshell.send(req.body.base64)
    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message)
    })
    console.log('closing WARNING')
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
})

PORT = 3000
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
