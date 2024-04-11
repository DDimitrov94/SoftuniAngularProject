const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')
const { secret } = require('../config')

const User = require('../models/User');


exports.register = async (userData) => {
    //check if password and rePassword match
    if(userData.password !== userData.rePassword) {
        throw new Error('Password does not match')
    }

    //check if user with this email exists
    const userEmail = await User.findOne({email: userData.email});
    if (userEmail) {
        throw new Error('Email already exist')
    }

    // return User.create(userData);

    // if you want to log in after registering 
    const newUser = await User.create(userData);
    console.log('New user created' + newUser)


    const token = await generateToken(newUser)

    let userInfo = newUser.toObject()
    delete userInfo.password

    return [token, userInfo];
}

exports.login = async ({email, password}) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Email or password is invalid')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Email or password is invalid')
    }
    
    
    const token = await generateToken(user);
    let userInfo = user.toObject()
    delete userInfo.password
    
    return [token, userInfo];
};

function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    return jwt.sign(payload, secret, {expiresIn: '1d'})
}