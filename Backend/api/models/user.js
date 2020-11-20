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
			nutrients: [],
			ingredients: [],
      name: { type: String },
      image: { type: String },
		},
	],
	password: { type: String },
	token: { type: String },
	pass_reset_key: { type: String },
	pass_key_expires: { type: Number },
	verification_key: { type: String },
	verification_key_expires: { type: Number },
	is_email_verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
