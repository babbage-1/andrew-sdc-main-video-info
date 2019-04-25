const {
  getMovieInfo, createMovieInfo, updateMovieInfo, deleteMovieInfo,
} = require('../db/index');
const {
  idIsNaN,
  isDataObjDefined,
} = require('./dataCheck');

const readOrDeleteController = async (req, res) => {
  console.log('what is method', req.method, typeof req.method);
  // assume id always given
  const movieId = req.params.id;
  const { method } = req;
  // check if id number, return error ir not
  if (idIsNaN(movieId)) {
    console.log('id not a number');
    res.sendStatus(400);
    return;
  }

  try {
    let result;
    if (method === 'GET') {
      result = await getMovieInfo(movieId);
    }
    if (method === 'DELETE') {
      result = await deleteMovieInfo(movieId);
    }
    // Send not found if db does not contain the movie
    if (result === undefined) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

const createOrUpdateController = async (req, res) => {
  console.log('what is method', req.method, typeof req.method);
  const movieId = req.params.id;
  const { method } = req;
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
    let result;
    if (method === 'POST') {
      result = await createMovieInfo(dataObj);
    }
    if (method === 'PUT') {
      result = await updateMovieInfo(dataObj, movieId);
    }
    // Send not found if db does not contain the movie
    if (result === undefined) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = {
  readOrDeleteController,
  createOrUpdateController,
};
