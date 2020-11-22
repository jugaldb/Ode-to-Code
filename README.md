# Foodalicious
Have you ever spent hours wondering what to cook for dinner? Well, Foodalicious is here to the rescue.
<br>
Foodalicious helps you look for recipes based on the ingredients you have on hand. It also allows you to assess the nutritional value of the dishes and suggests recipes that you might like based on your previous choices.  
<p align="center">
<a href="https://foodalicious.jugaldb.com/">
<img src="" width="400px" height="100px" alt="foodalicious logo"/>
</a>
</p>


## Project Description
It has always been a pain to decide what to cook for the next meal over and over again. We therefore thought of making lives easier by building Foodalicious – a website that allows users to enter the ingredients they currently have on hand and suggests the most appropriate recipes. It also provides additional information like the missing ingredients, the nutritional value and the popularity of the dish along with the detailed instructions for preparation. It also allows to search for recipes directly as well. Once the user is registered, they can also save their favourite recipes to get recommendations as per their preferences. Foodalicious thus serves as a perfect guide for those who just can’t decide what to cook.
We used the Spoonacular API (The only food API you’ll ever need) for implementing the various features.

## Inspiration
We’ve all faced this in our lives – the conundrum of choice as for what to prepare for the next meal. Sometimes we might not have enough ingredients and at times we have way too many choices. Browsing the internet for recipes doesn’t help much because it just creates more confusion for most people. That’s where we got the inspiration to create a single platform to suggest the best recipes possible, according to your current requirements and stock. 

## What it does

The services offered by Foodalicious: 
* Allows to search for appropriate recipes either by ingredients or the dish name itself
*	Suggests random recipes for new users 
*	Recommends similar recipes based on the user preferences
*	Gives detailed information about the recipe including: nutritional value, missing ingredients, preparation time and the popularity of the dish among other users (number of likes)  

## How we built it
Foodalicious was built with Node.js and used the Spoonacular API to fetch the required data. The user data is stored in MongoDb. The frontend of the website was created using HTML, CSS and Javascript. We also came up with our own Machine Learning Model which takes the user's previously saved recipes into account and suggests similar recipes for the future, it also gives similar recipes when the user tries to read one recipe.

## Challenges we ran into
Designing the ML model was a bit tough and to make it work dynamically everytime with new data was a challenge too. Spooncular API has it's own downsides as well, to overcome them was a big task.


## Accomplishments that we're proud of.
We were able to come up with a fully functional website within a day and a half. This website might actually help people to solve this frequent problem and aid their decision-making process. Once our ML model started working as we expected it to work, we were really happy and satisfied. To overcome the spoonacular API loopholes while making the wrapper API smaller was a tedious task as well. 

## What we learned
We mainly learned to use the Spoonacular API and how to deploy ML model which takes the info and parses it quickly.

## Steps to run 
```bash
$ git clone https://github.com/jugaldb/Ode-to-Code.git
$ cd Ode-to-Code
$ npm i
$ add the .env file in root of the project
$ npm run dev/npm start
```

## Contents of the .env file
```
  MONGODB_URL= <DATABASE URI>
  JWT_Secret=  <JWT SECRET for user auth>
  SPOONACULAR_API_KEY=  <API key to access SPONNACULAR API>
  SPOONACULAR_API_KEY2= <API key to access SPONNACULAR API>
  SPOONACULAR_API_KEY3= <API key to access SPONNACULAR API>
  SPOONACULAR_API_KEY4= <API key to access SPONNACULAR API>
  SPOONACULAR_API_KEY5= <API key to access SPONNACULAR API>
```

## Useful Links
- [Foodalicious Website]( https://foodalicious.jugaldb.com/)
- [Demo Video]()

## Requirements
-  [x] NodeJs (or https://nodejs.org/en/)
-  [x] Npm
-  [x] Python Interpreter
-  [x] Internet :P 


## License
