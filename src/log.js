const fs = require('fs');
const path = require('path');

module.exports = function log () {
  var logIndex = 0;

  return function (req, res, next) {
    logIndex++;

    var content = {
      method: req.method,
      path: req.path,
      headers: req.headers,
      query: req.query,
      body: req.body
    };

    var now = new Date();

    fs.writeFileSync(`requests/${now.getTime()}-${logIndex}.json`, JSON.stringify(content, null, 2));
    next();
  }
}