
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 2000;
const {
  getMovieInfo, createMovieInfo,
} = require('../db/index');
const {
  idIsNaN,
  isDataObjDefined,
} = require('./dataCheck');

app.use('/main/:id', express.static('client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// get request for movie info
app.get('/info/:id', async (req, res) => {
  // assume id always given
  const movieId = req.params.id;
  // check if id number, return error ir not
  if (idIsNaN(movieId)) {
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


app.post('/info/:id/create', async (req, res) => {
  console.log('CREATE new item');
  const movieId = req.params.id;
  // return error if id not number
  if (idIsNaN(movieId)) {
    console.log('id not a number');
    res.sendStatus(400);
    return;
  }
  const {
    name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
  } = req.body;

  const dataObj = {
    name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
  };
  // return error if data obj not properly defined.
  if (!isDataObjDefined(dataObj)) {
    console.log('dataObj not properly defined');
    res.sendStatus(400);
    return;
  }

  try {
    const createResult = await createMovieInfo(dataObj);
    // Send not found if db does not contain the movie
    console.log(createResult);
    if (createResult === undefined) {
      res.sendStatus(404);
    }
    res.json(createResult);
  } catch (e) {
    res.sendStatus(500);
  }
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
