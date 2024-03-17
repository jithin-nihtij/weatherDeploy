const express = require('express')
const createUser = require('./Controllers/createUser')
const loginUser = require('./Controllers/Login')
const weatherCreate = require('./Controllers/WeatherCreate')
const getWeather = require('./Controllers/getWeather')

const router = express.Router()

router.route('/createUser').post(createUser)
router.route('/loginUser').post(loginUser)
router.route('/saved').post(weatherCreate)
router.route('/getSaved/:userId').get(getWeather)
module.exports = router