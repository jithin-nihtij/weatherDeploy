const weatherData = require("./WeatherSchema")

const getWeather = async(req,res)=>{
    const userId = req.params.userId
    const weather = await weatherData.find({ userId: userId });
    res.json(weather)
}

module.exports = getWeather