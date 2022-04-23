var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const router = require('./routes')
router.init(app)

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = app;
