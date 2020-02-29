const express = require('express')
const app = express()
const port = 3000

// find static file directory
app.use(express.static('public'))

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

// 載入 restaurant modle
const Restaurant = require('./models/restaurant.js')

// set route & show all restaurants
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})

// show specific restaurant
app.get('/restaurants/:_id', (req, res) => {
  console.log(req.params)
  Restaurant.findById(req.params._id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant })
    })
})

// listen app
app.listen(port, () => {
  console.log('App is listening')
})
