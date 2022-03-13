const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});

router.post('/upfile', upload.single('upfile'), async function (req, res, next) {
    res.json({ name: req.file.filename, type: req.file.mimetype, size: req.file.size })
})

module.exports = router