const fs = require("node:fs");

module.exports = (req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `[${Date.now()}]  ${req.method}  ${req.url}\n`,
    (error) => {
      // do nothing
    }
  );
  next();
};
