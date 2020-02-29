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

// set rout
// show all restaurants
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})

// create - show new page
app.get('/new', (req, res) => {
  res.render('new')
})
// create - 處理db & 顯示結果
app.post('/new', (req, res) => {
  // 新增 restaurant model 接收 req.body 內的資料
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: Number(req.body.rating),
    description: req.body.description
  })
  // 存入 db
  restaurant.save(err => {
    if (err) return console.error(err)
    // 導回首頁
    return res.redirect('/')
  })
})
// show specific restaurant
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant })
    })
})
// edit - show new page
app.get('/edit/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant })
    })
})
// edit - 處理db & 顯示結果
app.post('/edit/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    console.log('OK')
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = Number(req.body.rating)
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})
// delete
app.post('/delete/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})
// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const results = restaurants.filter(
        item =>
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.category.toLowerCase().includes(keyword.toLowerCase())
      )
      res.render('index', { restaurants: results, keyword })
    })
})

// listen app
app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
