const recipeService = require('../services/recipeService')

async function isRecipeOwner(req, res, next) {
    const recipe = await recipeService.getOne(req.params.recipeId).lean();

    if(recipe.owner != req.user?._id) {
        return res.redirect(`/recipe/${req.params.recipeId}/details`);
    }

    //here we attach the recipe taken from the base to the req.body so we can use it in /edit
    req.recipe = recipe;

    next();
};

async function isNotRecipeOwner(req, res, next) {
    const recipe = await recipeService.getOne(req.params.recipeId).lean();

    if(recipe.owner == req.user?._id) {
        return res.redirect(`/recipe/${req.params.recipeId}/details`);
    }

    //here we attach the recipe taken from the base to the req.body so we can use it in /edit
    req.recipe = recipe;

    next();
};

exports.isRecipeOwner = isRecipeOwner;
exports.isNotRecipeOwner = isNotRecipeOwner;