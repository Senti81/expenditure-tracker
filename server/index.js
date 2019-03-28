const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Log = require('./config/log')
const ExpenditureRoutes = require('./routes/ExpenditureRoutes')
const Connection = require('./config/connection')
const port = process.env.PORT || 8081

const app = express()

app.use(cors());
app.use(bodyParser.json());

Connection()
Log(app)

ExpenditureRoutes(app)

app.listen(port, () => {
    console.log(`listening on ${port}`)
});