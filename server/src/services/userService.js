const User = require('../models/User')

exports.getInfo = (userId) => {
    return User.findById(userId).populate(['favorites'])
}
