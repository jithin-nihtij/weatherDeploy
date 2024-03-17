const weatherData = require("./WeatherSchema")


const weatherCreate = async(req,res)=>{
    const {cityName,userId} = req.body

    const createWeather = await weatherData.create({
        cityName,userId
    })
    res.json(createWeather)
}

module.exports = weatherCreate