const express = require('express');
const router = express.Router();
const dns = require('dns/promises');
const urls = {}

router.get('/whoami', function (req, res, next) {
    res.json({ ipaddress: req.headers.host, language: req.headers['accept-language'], software: req.headers['user-agent'] })
})

router.get('/:date?', function (req, res, next) {
    const rawDate = req.params.date
    let parsedDate = new Date()
    if (!!rawDate)
        parsedDate = new Date(Number.isInteger(+rawDate) ? +rawDate : rawDate);
    if (parsedDate == 'Invalid Date')
        res.json({ error: 'Invalid Date' })
    else
        res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() })
})
router.post('/shorturl', async function (req, res, next) {
    const url = req.body.url
    try {
        dns.lookup(url, 6)
        if (urls.hasOwnProperty(url))
            urls[url] = Object.keys(url).length + 1
        res.json({ original_url: url, short_url: urls[url] })
    } catch (e) {
        res.send({ error: 'invalid url' })
    }
})
router.get('/shorturl/:shorturl', async function (req, res, next) {
    const key = req.params.shorturl
    res.redirect(urls[key])
})

module.exports = router