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
ExpenditureRoutes(app)

app.listen(port, () => {
    Log.info(`listening on ${port}`)
});