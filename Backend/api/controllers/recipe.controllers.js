const shortid = require("shortid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const axios = require("axios");
// const emailTemplates = require('../emails/email');

sgMail.setApiKey(process.env.SendgridAPIKey);

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_API_KEY2 = process.env.SPOONACULAR_API_KEY2;
const SPOONACULAR_API_KEY3 = process.env.SPOONACULAR_API_KEY3;
const SPOONACULAR_API_KEY4 = process.env.SPOONACULAR_API_KEY4;
const SPOONACULAR_API_KEY5 = process.env.SPOONACULAR_API_KEY5;

const ingredients = async (req, res, next) => {
	const { ingredients } = req.body;
	console.log(ingredients);
	let ingredientString = "";

	for (let i = 0; i < ingredients.length; i++) {
		if (i == ingredients.length - 1) {
			ingredientString += ingredients[i];
		} else {
			ingredientString += ingredients[i] + ",";
		}
	}
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&number=5&apiKey=${SPOONACULAR_API_KEY}`,
		{}
	);
	res.status(200).json(response.data);
};

const nutrition = async (req, res) => {
	const { recipeId } = req.body;
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${SPOONACULAR_API_KEY2}`
	);
	res.status(200).json(response.data);
};

const name = async (req, res) => {
	const { name } = req.body;
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?query=${name}&maxFat=25&number=10&apiKey=${SPOONACULAR_API_KEY3}`
	);
	res.status(200).json(response.data);
};

const similarRecipes = async (req, res) => {
	const { recipeId } = req.body;
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${SPOONACULAR_API_KEY4}`
	);
	res.status(200).json(response.data);
};

const instructions = async (req, res) => {
  const { recipeId } = req.body;
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${SPOONACULAR_API_KEY5}`
	);
	res.status(200).json(response.data);
};

const getInfo = async (req, res) => {
  const { recipeId } = req.body;
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
	);
	res.status(200).json(response.data);
}

const randomRecipes = async(req,res) => {

	const response = await axios.get(
			`https://api.spoonacular.com/recipes/random?number=5&tags=vegetarian&apiKey=${SPOONACULAR_API_KEY2}`

		);
	res.status(200).json(response.data);

};

const checkSaved = async(req,res) => {

	const userId = req.user.userId;
	const user = await User.findById(userId);
	let isSaved=false;
	const recipes = user.recipes;
	const {recipeId} = req.body;

	for(let i=0; i<recipes.length; i++){

		if(recipes[i].recipeId == recipeId){
			isSaved = true;
			break;
		}
	}

	return isSaved;
	
}



module.exports = {
	ingredients,
  nutrition,
  name,
  similarRecipes,
  getInfo,
  instructions,
  randomRecipes
	
};
