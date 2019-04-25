const { Pool } = require('pg');
const path = require('path');
const { config } = require('../postgres_config');
const pool = new Pool(config);

const getMovieInfo = async (id) => {
  // prepared query for faster querying
  const getMovieInfoQuery = {
    name: 'get-MovieInfo',
    text: 'SELECT * FROM movieinfo WHERE id = $1',
    values: [id],
  };

  try {
    const res = await pool.query(getMovieInfoQuery);
    console.log(`movie info for id ${id}\n`, res.rows[0]);
    return res.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// const createMovieInfo = async (dataObj) => {
//   try {

//     const queryString = `INSERT INTO
//     (name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
//     const params = [];
//     const res = await pool.query(queryString, params);
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// }

// const getMoviePoster = async (id) => {
//   try {
//     console.time('timing query');
//     const res = await pool.query('SELECT image FROM movieinfo WHERE id = $1', [id]);
//     console.timeEnd('timing query');
//     console.log(`movie poster url for id ${id}\n`, res.rows[0]);
//     return res.rows[0];
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

module.exports = {
  getMovieInfo,
};
