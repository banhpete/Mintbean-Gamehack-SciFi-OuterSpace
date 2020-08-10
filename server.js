const morgan = require('morgan')
const express = require('express')

const app = express()

app.use(morgan('dev'))

app.get('/', function (req, res, next) {
  res.send('Hello World')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Listening on Port ${PORT}`) })