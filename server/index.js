require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { movieInfoController, movieInfoReadController, movieInfoCreateController } = require('./movieInfoController');

app.use('/main/:id', express.static('client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/main/:id/read', movieInfoReadController);
app.post('/main/:id/create', movieInfoCreateController);
app.put('/main/:id/update', movieInfoController);
app.delete('/main/:id/delete', movieInfoController);

app.get('/loaderio-e69bf2d329853aa191a029c84381e2ae', (req, res) => {
  const filePath = path.join(__dirname, './loaderio-e69bf2d329853aa191a029c84381e2ae.txt');
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 2002;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
