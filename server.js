const app = require('./src/app');

const PORT = process.env.APP_PORT || 4999;

app.listen(PORT, function (e) {
  console.log(`Rekognition fake server at port ${PORT}`);
});