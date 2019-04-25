const { Pool } = require('pg');
const path = require('path');
const { config } = require('../postgres_config');
const pool = new Pool(config);


const getMovieInfo = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM movieinfo WHERE id = $1', [id]);
    console.log(`movie info for id ${id}\n`, res.rows[0]);
    return res.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

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
