const express=require('express')
const cookieParser=require('cookie-parser')
const path = require('path')
const morgan=require('morgan')
const errorHandler = require('errorhandler')
const port = process.env.port || 3000
const environnement = process.env.NODE_ENV
const routing = require('./routes')
require('./database')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(morgan('short'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser());

app.use(errorHandler())

app.use(routing)

app.listen(port)