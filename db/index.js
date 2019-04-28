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
    console.log({ command, rowCount });
    return { command, rowCount };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateMovieInfo = async (dataObj, id) => {
  const {
    name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image,
  } = dataObj;

  const updateQuery = {
    name: 'update-MovieInfo',
    text: `UPDATE movieinfo
    SET name = $1, genre = $2, score = $3, runtime = $4, rating = $5, releaseday = $6, releasemonth = $7, releaseyear = $8, image = $9
    WHERE id = $10`,
    values: [name, genre, score, runtime, rating, releaseday, releasemonth, releaseyear, image, id],
  };

  try {
    const res = await pool.query(updateQuery);
    const { command, rowCount } = res;
    console.log({ command, rowCount });
    return { command, rowCount };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const deleteMovieInfo = async (id) => {
  // prepared query for faster querying
  const deleteQuery = {
    name: 'delete-MovieInfo',
    text: 'DELETE FROM movieinfo WHERE id = $1',
    values: [id],
  };

  try {
    const res = await pool.query(deleteQuery);
    const { command, rowCount } = res;
    console.log({ command, rowCount });
    return { command, rowCount };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  getMovieInfo,
  createMovieInfo,
  updateMovieInfo,
  deleteMovieInfo,
};
