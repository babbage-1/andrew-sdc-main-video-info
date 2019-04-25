/* eslint-disable no-restricted-globals */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { getMovieInfo } = require('../db/index.js');
const PORT = process.env.PORT || 2000;

app.use('/main/:id', express.static('client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// get request for movie info
app.get('/info/:id', async (req, res) => {
  // assume id always given
  const movieId = req.params.id;
  // check if id number, return error ir not
  const isNotNumber = isNaN(Number(movieId));
  if (isNotNumber) {
    console.log('id not a number');
    res.sendStatus(400);
    return;
  }

  try {
    const movieInfo = await getMovieInfo(movieId);
    // Send not found if db does not contain the movie
    if (movieInfo === undefined) {
      res.sendStatus(404);
    }
    res.json(movieInfo);
  } catch (e) {
    res.sendStatus(500);
  }
});


app.post('/info/:id/update', (req, res) => {
  console.log('CREATE new item');

  res.status(200).send('Create New Item from POST');
});


app.get('/info/:id/put', (req, res) => {
  console.log('UPDATE old item');

  res.status(200).send('Update New Item from PUT');
});

app.get('/info/:id/delete', (req, res) => {
  console.log('DELETE new item');

  res.status(200).send('DELETE New Item from DELETE');
});

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
