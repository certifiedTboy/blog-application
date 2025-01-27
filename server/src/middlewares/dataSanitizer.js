const perfectExpressSanitizer = require("perfect-express-sanitizer");

const sanitizeData = (req, res, next) => {
  const options = { xss: true, noSql: true, sql: true, level: 5 };

  perfectExpressSanitizer.sanitize.prepareSanitize(req.body, options);

  //   req.body = { ...req.body, title: sanitizedTitle };

  next();
};

module.exports = { sanitizeData };
