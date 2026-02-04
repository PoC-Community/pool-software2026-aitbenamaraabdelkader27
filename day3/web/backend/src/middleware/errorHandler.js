const { error } = require("../utils/helpers");

function notFound(req, res) {
  return error(res, 404, "Route not found");
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);
  return error(res, 500, "Server error");
}

module.exports = { notFound, errorHandler };
