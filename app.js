const express = require('express')
const app = express()
const port = 3000

// 載入 handlebars as template engine & set layout: main
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')

// 載入 body-parser & setting it
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入 mongoose & 連線 DB & 使用 connection 物件
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
// db error
db.on('error', () => {
  console.log('db error')
})
// db connected
db.once('open', () => {
  console.log('db connected')
})

// set route
app.get('/', (req, res) => {
  res.render('index')
})
// listen app
app.listen(port, () => {
  console.log('App is listening')
})
