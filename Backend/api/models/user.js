const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_type: { type: String, default: "User" },
	name: { type: String },
	google_id: { type: Number },
	email: {
		type: String,
	},
	recipes: [
		{
      recipeId: String,
      likes: Number,
			name: String,
			image: String,
		},
	],
	password: { type: String },
	token: { type: String },
	pass_reset_key: { type: String },
	pass_key_expires: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
