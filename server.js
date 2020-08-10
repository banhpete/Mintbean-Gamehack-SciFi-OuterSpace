const morgan = require('morgan')
const express = require('express')
var path = require("path");

const app = express()

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('dev'))

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log(`Listening on Port ${PORT}`) })