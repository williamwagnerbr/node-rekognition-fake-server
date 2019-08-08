const express = require('express');
const bodyParser = require('body-parser');

module.exports = function ({ getTexts, getLabels }) {
  const app = express();

  // Middlewares
  app.use(bodyParser.raw({ type: '*/*' }));

  // Parse body content
  app.use(function (req, res, next) {
    try {
      req.body = JSON.parse(req.body.toString('utf8'));
    } catch (e) {
      console.warn(e);
    }
    next();
  });

  //app.use(log());

  app.use(async function (req, res, next) {
    var target = req.header('x-amz-target');

    if (!req.body.Image.S3Object) {
      return res.status(400).send('Param Image.S3Object is required');
    }

    if (!req.body.Image.S3Object.Bucket) {
      return res.status(400).send('Param Image.S3Object.Bucket is required');
    }

    if (!req.body.Image.S3Object.Name) {
      return res.status(400).send('Param Image.S3Object.Name is required');
    }

    var image = {
      Bucket: req.body.Image.S3Object.Bucket,
      Name: req.body.Image.S3Object.Name
    };

    if (target === 'RekognitionService.DetectText') {
      let results = await getTexts(image);

      return res.status(200).send({
        TextDetections: results
      });
    }

    if (target === 'RekognitionService.DetectLabels') {
      let results = await getLabels(image);
      
      return res.status(200).send({
        Labels: results
      });
    }

    res.status(400).send('Unsupported request type');
  });

  return app;
}