const {
  getMovieInfo, createMovieInfo, updateMovieInfo, deleteMovieInfo,
} = require('../db/index');
const {
  idIsNaN,
  isDataObjDefined,
} = require('./dataCheck');

const movieInfoController = async (req, res) => {
  // assume id always given
  const { method } = req;
  let movieId;
  // get
  if (method === 'PUT' || method === 'DELETE') {
    movieId = req.params.id;
    if (idIsNaN(movieId)) {
      // check if id number, return error ir not
      console.log('id not a number');
      res.sendStatus(400);
      return;
    }
  }

  try {
    let result;

    // handle DELETE
    if (method === 'DELETE') {
      result = await deleteMovieInfo(movieId);
    }
    // Initialize variables for POST and PUT
    if (method === 'PUT') {
      const {
        name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
      } = req.body;
      const dataObj = {
        name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
      };
      // check data obj. return error if data obj not properly defined.
      if (!isDataObjDefined(dataObj)) {
        console.log('dataObj not properly defined');
        res.sendStatus(400);
        return;
      }
      // handle PUT
      if (method === 'PUT') {
        result = await updateMovieInfo(dataObj, movieId);
      }
    }
    // Check results. Send not found if db does not contain the movie
    if (result === undefined) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (e) {
    console.log('================== error! ==================');
    res.sendStatus(500);
  }
};

const movieInfoReadController = async (req, res) => {
  const movieId = req.params.id;
  if (idIsNaN(movieId)) {
    // check if id number, return error ir not
    console.log('id not a number');
    res.sendStatus(400);
    return;
  }
  try {
    // get result
    const result = await getMovieInfo(movieId);
    // check if result is undefined
    if (result === undefined) {
      console.log('result is undefined!');
      res.sendStatus(404);
    }
    res.json(result);
  } catch (e) {
    console.log('============= error! =============');
    res.sendStatus(500);
  }
};

const movieInfoCreateController = async (req, res) => {
  const {
    name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
  } = req.body;
  const dataObj = {
    name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
  };
  if (!isDataObjDefined(dataObj)) {
    console.log('dataObj not properly defined');
    res.sendStatus(400);
    return;
  }
  const result = await createMovieInfo(dataObj);
  if (result === undefined) {
    res.sendStatus(404);
  }
  res.status(201).json(result);
};

module.exports = {
  movieInfoController,
  movieInfoReadController,
  movieInfoCreateController,
};
