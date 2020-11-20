const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.header("Authorization");
  const split = header.split(" ");
  const token = split[1]
  if (!token) return res.status(400).send("Access Denied!, no token entered");

  try {
    const verified = JWT.verify(token, process.env.JWT_Secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ error: "auth failed, check auth-token222" });
  }
};
