const { Pool } = require('pg');
const path = require('path');
const { config } = require('../postgres_config');
const pool = new Pool(config);

const getMovieInfo = async (id) => {
  // prepared query for faster querying
  const getQuery = {
    name: 'read-MovieInfo',
    text: 'SELECT * FROM movieinfo WHERE id = $1',
    values: [id],
  };

  try {
    const res = await pool.query(getQuery);
    console.log(`movie info for id ${id}\n`, res.rows[0]);
    return res.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const createMovieInfo = async (dataObj) => {
  const {
    name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
  } = dataObj;

  const createQuery = {
    name: 'create-MovieInfo',
    text: `INSERT INTO movieinfo
    (name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image],
  };

  try {
    const res = await pool.query(createQuery);
    const { command, rowCount } = res;
    console.log({ command, rowCount })
    return { command, rowCount };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  getMovieInfo,
  createMovieInfo,
};
