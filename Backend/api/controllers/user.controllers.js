const shortid = require("shortid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const emailTemplates = require('../emails/email');

sgMail.setApiKey(process.env.SendgridAPIKey);

const userRegister = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: "Email Exists",
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							name: req.body.name,
						});
						user
							.save()
							.then(async (result) => {
								console.log(`User created ${result}`);
								return res.status(201).json({
									userDetails: {
										userId: result._id,
										email: result.email,
										name: result.name,
										mobileNumber: result.mobileNumber,
									},
								});
							})
							.catch((err) => {
								console.log(err);
								return res.status(500).json({
									message: err.toString(),
								});
							});
					}
				});
			}
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				message: err.toString(),
			});
		});
};

const userLogin = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			console.log(user);
			if (user.length < 1) {
				return res.status(401).json({
					message: "Auth failed: Email not found probably",
				});
			}
			// if (user[0].is_email_verified === false) {
			// 	console.log("Please Verify your Email");
			// 	return res.status(409).json({
			// 		message: "Please verify your email",
			// 	});
			// }
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					console.log(err);
					return res.status(401).json({
						message: "Auth failed",
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							userId: user[0]._id,
							userType: user[0].userType,
							userId: user[0]._id,
							email: user[0].email,
							name: user[0].name,
						},
						process.env.JWT_Secret,
						{
							expiresIn: "1d",
						}
					);
					console.log(user[0]);
					return res.status(200).json({
						message: "Auth successful",
						userDetails: {
							userType: user[0].userType,
							userId: user[0]._id,
							name: user[0].name,
							email: user[0].email,
						},
						token: token,
					});
				}
				res.status(401).json({
					message: "Auth failed1",
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

const forgotPassword = async (req, res, next) => {
	var email = req.body.email;
	User.findOne({ email: email }, (err, userData) => {
		if (!err && userData != null) {
			userData.pass_reset_key = shortid.generate();

			userData.pass_key_expires = new Date().getTime() + 20 * 60 * 1000; // pass reset key only valid for 20 minutes
			userData.save().then((x) => {
				// const html = emailTemplates.FORGOT_PASSWORD(x);
				//	console.log(html);
				if (!err) {
					const msg = {
						to: email,
						from: process.env.sendgridEmail,
						subject: "Ode-To-Code: Password Reset Request",
						text: userData.pass_reset_key,
						html: html,
					};

					sgMail
						.send(msg)
						.then((result) => {
							res.status(200).json({
								message: "Password reset key sent to email",
							});
						})
						.catch((err) => {
							res.status(500).json({
								// message: "something went wrong1",
								error: err.toString(),
							});
						});
				}
			});
		} else {
			res.status(400).send("email is incorrect");
		}
	});
};

const resetPassword = async (req, res, next) => {
	let resetKey = req.body.resetKey;
	let newPassword = req.body.newPassword;

	await User.findOne({ passResetKey: resetKey })
		.then(async (result) => {
			if (Date.now() > result.passKeyExpires) {
				res.status(401).json({
					message: "Pass key expired",
				});
			}
			result.password = bcrypt.hashSync(newPassword, 10);
			result.pass_reset_key = null;
			result.pass_key_expires = null;
			await result
				.save()
				.then((result1) => {
					res.status(200).json({
						message: "Password updated",
					});
				})
				.catch((err) => {
					res.status(403).json({
						message: "Unusual error",
						err: err.toString(),
					});
				});
		})
		.catch((err) => {
			res.status(400).json({
				message: "Invalid pass key",
			});
		});
};

const changePassword = async (req, res, next) => {
	await User.findOne({ _id: req.user.userId })
		.then(async (result) => {
			bcrypt.compare(req.body.password, result.password, (err, result1) => {
				if (err) {
					return res.status(401).json({
						message: "Auth failed",
					});
				}
				if (result1) {
					bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
						if (err) {
							res.status(400).json({
								err,
							});
						}
						User.updateOne(
							{ _id: req.user.userId },
							{ $set: { password: hash } }
						)
							.then((result) => {
								res.status(200).json({
									message: "Password changed",
								});
							})
							.catch((err) => {
								res.status(400).json({
									message: "error",
									error: err.toString(),
								});
							});
					});
				} else {
					return res.status(401).json({
						message: "Auth failed",
					});
				}
			});
		})
		.catch((err) => {
			res.status(400).json({
				error: err.toString(),
			});
		});
};

const getMe = async (req, res) => {
	const userId = req.user.userId;
	const user = await User.findById(userId);
	if (user) {
		res.status(200).json({
			message: "Found",
			user,
		});
	} else {
		res.status(400).json({
			message: "Bad request",
		});
	}
};

module.exports = {
	userRegister,
	userLogin,
	resetPassword,
	forgotPassword,
	changePassword,
	getMe,
};
