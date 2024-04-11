const Recipe = require('../models/Recipe');
const User = require('../models/User');

exports.getRandom = () => Recipe.aggregate([ { $sample: { size: 1 } }]);
// exports.getRandom = () => Recipe.aggregate().sample(1);

exports.getAll = (filter={}) => Recipe.find(filter);

exports.getOne = (recipeId) => Recipe.findById(recipeId);

exports.getOneDetailed = (recipeId) => this.getOne(recipeId).populate('owner')

exports.getLatest = () => Recipe.find().sort({createdAt: -1}).limit(3)

exports.getAllOwned = (ownerId) => Recipe.find({owner: ownerId})

exports.like = async (recipeId, userId) => {
    //get recipe the user wants to like
    const recipe = await Recipe.findById(recipeId);

    //check if user has liked (is in favorite obj)
    const hasLiked = recipe.favorite.some(user => user._id == userId);

    if (!hasLiked) {
        //push user into recipe favorite obj
        recipe.favorite.push(userId);
        
        await recipe.save();

        //push recipe ID into user.favorite.obj
        const user = await User.findById(userId)
        user.favorites.push(recipeId)

        await user.save()
    }
    
    return recipe;
};

exports.unlike = async (recipeId, userId) => {
    const recipe = await Recipe.findById(recipeId);
    
    const hasLiked = recipe.favorite.some(user => user._id == userId);

    if (hasLiked) {
        recipe.favorite.remove(userId);
    
        await recipe.save();

        const user = await User.findById(userId)
        user.favorites.remove(recipeId)

        await user.save()
    }
    
    return recipe;
};

exports.create = async (userId, recipeData) => {
    const createdRecipe = await Recipe.create({
        owner: userId, 
        ...recipeData,
    });

    
    //find the user by ID and push in his created recipes the currently created recipe's ID
    await User.findByIdAndUpdate(userId, {$push: {recipes: createdRecipe._id} }) 
    
    console.log(createdRecipe);
    return createdRecipe;
}

exports.delete = (recipeId) => Recipe.findByIdAndDelete(recipeId);

exports.edit = (recipeId, recipeData) => Recipe.findByIdAndUpdate(recipeId, recipeData, {runValidators: true});