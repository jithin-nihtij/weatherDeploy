const { compare } = require("bcrypt");
const dotenv = require('dotenv');
const WeatherUser = require("./UserSchema");
const jwt = require('jsonwebtoken');


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userLogin = await WeatherUser.findOne({ email });

    if (userLogin && (await compare(password, userLogin.password))) {
        res.json({
            message: 'login success',
            token: generateToken(userLogin._id),
            userId:userLogin._id
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.key, { expiresIn: '1d' });
};

module.exports = loginUser;
