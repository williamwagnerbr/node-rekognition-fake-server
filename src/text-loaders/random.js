const randomWords = require('random-words');

/**
 * Text Loader - random
 * @param {Object|null} params
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
      .map(function (word, index) {
        var fontSize = Math.round((Math.random() * 22) + 10);
        var box = {
          Width: word.length * fontSize,
          Height: fontSize,
          Left: Math.round(Math.random() * 600),
          Top: Math.round(Math.random() * 600)
        };
  
        return {
          DetectedText: word,
          Type: 'WORD',
          Id: index,
          ParentId: null,
          Confidence: Math.round((Math.random() * 90) + 10) / 100,
          Geometry: {
            BoundingBox: box,
            Polygon: [
              {
                X: box.Left,
                Y: box.Top
              },
              {
                X: box.Left + box.Width,
                Y: box.Top
              },
              {
                X: box.Left + box.Width,
                Y: box.Top + fontSize
              },
              {
                X: box.Left,
                Y: box.Top + fontSize
              }
            ]
          }
        }
      });
  }
}