const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        minLenght: [2, 'Name should be at least 2 characters']
    },
    image: {
        type: String,
        required: [true,'Image is required'],
        validate: [/^https?:\/\//i, 'Wrong Format Image']
    },
    ingredients: {
        type: [{
            type: String,
        }],
        required: [true, 'Category is required']},
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLenght: [10, 'Description should be at least 10 characters']

    },
    preperationTime: {
        type: Number,
        required: [true, 'Preperation time is required']
    },
    favorite: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    createdAt: Date
});

recipeSchema.pre('save', function() {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;