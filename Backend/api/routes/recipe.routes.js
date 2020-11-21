const express = require('express');
const checkAuth = require('../middlewares/check_auth');
const recipeControllers = require('../controllers/recipe.controllers');
const router = express.Router();

router.get('/ingredients', recipeControllers.ingredients);//NEEDED
router.get('/nutrition/:recipeId', recipeControllers.nutrition);
router.get('/name/:name', recipeControllers.name);//NEEDED
router.get('/similar/:recipeId', recipeControllers.similarRecipes); //NEEDED
router.get('/info/:recipeId', recipeControllers.getInfo); ///NEEDED
router.get('/instructions/:recipeId', recipeControllers.instructions);
router.get('/random', recipeControllers.randomRecipes);
router.post('/save', checkAuth, recipeControllers.saveRecipe);

module.exports = router
