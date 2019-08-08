const factoryApp = require('./factory-app');
const getTexts = require('./text-loaders/random')({});
const getLabels = require('./labels-loaders/random')({});

module.exports = factoryApp({
  getTexts,
  getLabels
});