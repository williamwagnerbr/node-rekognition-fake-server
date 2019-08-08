const fs = require('fs');
const path = require('path');

/**
 * Label loader - filesystem
 * @param {Object} params
 * @param {String} params.directory
 * @returns {Function}
 */
module.exports = function (params) {

  /**
   * Loader
   * @param {Object} image
   * @param {String} image.Bucket
   * @param {String} image.Name
   * @returns {Array}
   */
  return async function (image) {
    return new Promise(function (resolve, reject) {
      
      var name = [ image.Bucket, image.Name ].join('%%').replace(/\//g, '%%');
      var fullPath = path.join(params.directory, name);

      return fs.readFile(fullPath, function (err, result) {
        if (err) {
          resolve([]);
        }
        
        try {
          result = JSON.parse(result);
        } catch (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }
}