const express = require('express')
const ShortUrl = require('./models/shortUrls')
const app = express()

const ShortUrlModel = new ShortUrl();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const shortUrls = ShortUrlModel.fetchAll()
    res.render('index', { shortUrls: shortUrls });
})

app.post('/shortUrls', (req, res) => {
    ShortUrlModel.create(req.body.fullUrl)
    res.redirect('/')
})

app.get('/:shortUrl', (req, res) => {
    const shortUrl = ShortUrlModel.findOne(req.params.shortUrl)
    if (!shortUrl) return res.sendStatus(404)
    ShortUrlModel.incrementClicks(shortUrl.short);
    res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 3000);
