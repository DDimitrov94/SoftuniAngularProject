const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username should be at least 3 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        },
    },
    email: {
        type: String, 
        required: [true, 'email is required'],
        // minLength: [10, 'email should be at least 10 characters']
    },
    password: {
        type: String, 
        required: [true, 'password is required'],
        minLength: [8, 'password should be at least 8 characters']
    },
    recipes: [{
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
    }],
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
    }]
});

userSchema.pre('save', async function() {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 12) 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;