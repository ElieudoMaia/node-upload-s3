require('dotenv').config()

const path = require('path')
const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/storage', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')) )
app.use(routes)

app.listen(3333)