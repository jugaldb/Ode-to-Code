const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const morgan = require('morgan')
const rateLimit = require("express-rate-limit");
// const passportSetup = require("./Backend/api/config/passport-setup");
// const passportSetupAdmin = require("./Backend/api/config/passport-setup-admin");
// const passport = require("passport");
const cors = require("cors");

const app = express();

app.use(morgan('combined'))

const userRoutes = require("./Backend/api/routes/user.routes");
const recipeRoutes = require("./Backend/api/routes/recipe.routes");


const MONGODB_URL = process.env.MONGODB_URL;

mongoose
	.connect(MONGODB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(Date.now());


// initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

/////Rate Limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 150, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Allow CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization,auth-token"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

// app.use(cors());

app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);
app.use(cors());

app.get("/", async (req, res) => {
	res.send("hi");
});

//route not found
app.use((req, res, next) => {
	const error = new Error("Route not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
