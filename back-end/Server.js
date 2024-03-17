const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const exp = require('constants')
const router = require('./Router')
const connection = require('./MongoConnect/Mongo')


dotenv.config()
connection()


app.use(express.json())
app.use(cors())
app.use('/',router)



const port = 5000
app.listen(port,console.log(`server is running on ${port}`))