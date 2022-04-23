const express = require('express');
const router = express.Router();
const dns = require('dns');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const urls = []

router.get('/whoami', function (req, res, next) {
  res.json({ ipaddress: req.headers.host, language: req.headers['accept-language'], software: req.headers['user-agent'] })
})

router.get('/:date?', function (req, res, next) {
  const rawDate = req.params.date
  let parsedDate = new Date()
  if (!rawDate) {
    return res.send({ unix: Date.now(), utc: parsedDate.toUTCString() })
  }
  if (!!rawDate)
    parsedDate = new Date(Number.isInteger(+rawDate) ? +rawDate : rawDate);
  if (parsedDate == 'Invalid Date')
    res.json({ error: 'Invalid Date' })
  else
    res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() })
})
router.post('/shorturl', async function (req, res, next) {
  const oUrl = new URL(req.body.url);
  const url = req.body.url;
  dns.lookup(oUrl.hostname, function (error, address, family) {
    console.log(error)
    if (error)
      return res.send({ error: 'invalid url' })
    if (!urls.includes(url))
      urls.push(url)
    res.json({ original_url: url, short_url: urls.indexOf(url) })
  })
})

router.post('/fileanalyse', upload.single('upfile'), async function (req, res, next) {
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size })
})

router.get('/shorturl/:shorturl', async function (req, res, next) {
  const key = req.params.shorturl
  res.redirect(urls[key])
})

module.exports = router