const jwt = require("jsonwebtoken");
const config = require("config");

function companyAuth(req, res, next) {
  const token = req.header("x-company-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.company = payload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

exports.companyAuth = companyAuth;
