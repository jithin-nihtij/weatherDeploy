const WeatherUser = require("./UserSchema")
const bcrypt = require('bcrypt')

const createUser = async(req,res)=>{
    const {name,email,password} = req.body

    const userExists = await WeatherUser.findOne({email})

    if(userExists){
        return res.status(400).json({ alert: "User already exists" });
    }

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const userCreate = await WeatherUser.create({
            name,email,password:hashedPassword
        })
        res.json(userCreate)

    }
    catch(err){
        console.log(err)
    }

   
}

module.exports = createUser