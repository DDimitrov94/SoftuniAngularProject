const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const { isRecipeOwner } = require('../middlewares/recipeMiddleware');
const recipeService = require('../services/recipeService');
// const { getErrorMessage } = require('../utils/errorHandle');


router.get('/', async (req, res) => {
    try {
        const recipe = await recipeService.getAll();
        
        res.json(recipe);
    } catch (err) {
        res.json({message: err.message, status: false})
    }
});

router.get('/random', async (req, res) => {
    try {
        const recipe = await recipeService.getRandom()
        
        res.json(recipe[0]);
    } catch (err) {
        res.json({message: err.message, status: false})
    }
});

router.get("/search/:query", async (req, res) => {
    const name = req.params.query;

    let search = {}

    if(name) {
        search.name = new RegExp(name, 'i')
    }

    try {
        let recipes = await recipeService.getAll(search).lean()
        console.log(recipes);
    
        res.json(recipes);
    } catch (err) {
        res.json({message: err.message, status: false})
    }

});

router.get('/owned', async (req, res) => {
    try {
        const userRecipes = await recipeService.getAllOwned(req.user._id);
    
        res.json(userRecipes)
    } catch (err) {
        res.json({message: err.message, status: false})
    }
});

router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await recipeService.getOneDetailed(req.params.recipeId);
    
        res.json(recipe);
    } catch (err) {
        res.json({message: err.message, status: false})
    }
});



router.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body; 
    console.log(recipeData);

    try {
        await recipeService.create(req.user._id, recipeData);

        res.end({status: true})
    } catch (err) {
        res.json({message: err.message, status: false});
    }
});

router.put('/:recipeId/edit', isAuth, isRecipeOwner, async (req, res) => {
    const recipeData = req.body;

    try {
        await recipeService.edit(req.params.recipeId, recipeData)
        
        res.end({status: true})
    } catch (err) {
        res.json({message: err.message, status: false})
    }

});

router.put('/:recipeId/like', async (req, res) => {
    try {
        await recipeService.like(req.params.recipeId, req.user._id)
        
        res.json({status: true})
    } catch (err) {
        res.json({message: err.message, status: false})
    }
    
});

router.put('/:recipeId/unlike', async (req, res) => {
    try {
        await recipeService.unlike(req.params.recipeId, req.user._id)
        
        res.json({status: true})
    } catch (err) {
        res.json({message: err.message, status: false})
    }
});

router.delete('/:recipeId/delete', isAuth, isRecipeOwner, async (req, res) => {
    try {
        await recipeService.delete(req.params.recipeId);
    
        res.end({status: true});
    } catch (err) {
        res.json({message: err.message, status: false})
    }
});


module.exports = router