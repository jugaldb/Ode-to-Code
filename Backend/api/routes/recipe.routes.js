const express = require('express');
const checkAuth = require('../middlewares/check_auth');
const recipeControllers = require('../controllers/recipe.controllers');
const router = express.Router();

router.get('/ingredients', recipeControllers.ingredients);//NEEDED
router.get('/nutrition', recipeControllers.nutrition);
router.get('/name', recipeControllers.name);//NEEDED
router.get('/similar:recipeId', recipeControllers.similarRecipes); //NEEDED
router.get('/info', recipeControllers.getInfo); ///NEEDED
router.get('/instructions', recipeControllers.instructions);
router.get('/random', recipeControllers.randomRecipes);
router.post('/save', checkAuth, recipeControllers.saveRecipe);

module.exports = router
