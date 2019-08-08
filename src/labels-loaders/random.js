const randomWords = require('random-words');

/**
 * Label loader - random
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
    return randomWords({ min: 3, max: 10 })
      .map(function (word) {
        return {
          Name: word,
          Confidence: Math.round((Math.random() * 90) + 10) / 100,
          Instances: [
            /*
            BoundingBox: [
              {
                Width: 200,
                Height: 300,
                Left: 2,
                Top: 3
              }
            ]
            */
          ],
          Parents: [
            /*
            {
              Name: 'person'
            }
            */
          ]
        }
      });
  }
}