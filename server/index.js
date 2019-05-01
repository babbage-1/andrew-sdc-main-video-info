require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { movieInfoController } = require('./movieInfoController');

app.use('/main/:id', express.static('client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/main/:id/read', movieInfoController);
app.post('/main/:id/create', movieInfoController);
app.put('/main/:id/update', movieInfoController);
app.delete('/main/:id/delete', movieInfoController);

app.get('/loaderio-e69bf2d329853aa191a029c84381e2ae', (req, res) => {
  const filePath = path.join(__dirname, './loaderio-e69bf2d329853aa191a029c84381e2ae.txt');
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/*
REDUNDANT API CALL. ABSOLUTELY NOT NECESSARY.
EVEN WITHIN THE ORIGINAL REPO FROM FANDANGIT, THE API CALL MADE FOR MOVIE INFO INCLUDED THE URL LINK TO THE MOVIE POSTER AND THIS INFORMATION IS PASSED DOWN TO CHILD COMPONENTS.
NO IDEA WHY THIS WAS INCLUDED WITHIN AS A SEPERATE API CALL.

route for getting movie poster
app.get('/info/:id/poster', (req, res) => {
  const movieId = req.params.id;
  db.getMoviePoster(movieId, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results[0].info.image);
    }
  });
});
*/
