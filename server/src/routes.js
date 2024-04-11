const router = require('express').Router();
const authController = require("./controllers/authController");
const recipeController = require('./controllers/recipeController')

router.use('/recipe', recipeController);
router.use('/auth', authController);

router.all('*', (req, res) => {
    res.json('invalid server endpoint');
});



module.exports = router;