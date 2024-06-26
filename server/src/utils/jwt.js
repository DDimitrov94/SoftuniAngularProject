const jsonwebtoken = require("jsonwebtoken");
const { promisify } = require("util");

/**
  * @type {{sign:jsonwebtoken.sign, verify:jsonwebtoken.verify}}
  */
const jwt = {
  sign: promisify(jsonwebtoken.sign),
  verify: promisify(jsonwebtoken.verify),
};

module.exports = jwt;