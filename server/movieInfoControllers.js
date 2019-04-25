const {
  getMovieInfo, createMovieInfo, updateMovieInfo, deleteMovieInfo,
} = require('../db/index');
const {
  idIsNaN,
  isDataObjDefined,
} = require('./dataCheck');

const movieInfoController = async (req, res) => {
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
    // handle GET
    if (method === 'GET') {
      result = await getMovieInfo(movieId);
    }
    // handle DELETE
    if (method === 'DELETE') {
      result = await deleteMovieInfo(movieId);
    }
    // Initialize variables for POST and PUT
    if (method === 'POST' || method === 'PUT') {
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
      // handle POST
      if (method === 'POST') {
        result = await createMovieInfo(dataObj);
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
    res.sendStatus(500);
  }
};

module.exports = {
  movieInfoController,
};
