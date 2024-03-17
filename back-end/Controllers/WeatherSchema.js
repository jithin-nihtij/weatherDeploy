const mongoose = require('mongoose')

const WeatherSchema = mongoose.Schema({
    cityName:{type:String},
    userId:{type:String}
    
})

const weatherData = mongoose.model('weatherData',WeatherSchema)

module.exports = weatherData