const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    if (err instanceof mongoose.MongooseError) {
        console.log(err);
        return Object.values(err.errors).at(0).message;
    } else if (err instanceof Error) {
        console.log(err.message)
        return err.message;
    }
}