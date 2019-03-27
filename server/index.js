const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = process.env.PORT || 8081

const app = express()
const ExpenditureRoutes = require('./routes/ExpenditureRoutes')

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/housekeeping', { useNewUrlParser: true })

ExpenditureRoutes(app)

app.listen(port, () => {
    console.log(`listening on ${port}`)
});