const { Pool } = require('pg');
const path = require('path');
const { testConfig } = require('../postgres_config');
const pool = new Pool(testConfig);

const seedPostgres = async () => {
  const client = await pool.connect();

  try {
    console.time('timing seed');
    // Transaction BEGIN!
    await client.query('BEGIN');
    console.log('creating movieinfo table!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS MovieInfo(
        name VARCHAR(150) NOT NULL,
        genre VARCHAR(150) NOT NULL,
        score SMALLINT NOT NULL,
        runtime SMALLINT NOT NULL,
        rating VARCHAR(10) NOT NULL,
        releaseDay SMALLINT NOT NULL,
        releaseMonth VARCHAR(20) NOT NULL,
        releaseYear SMALLINT NOT NULL,
        image VARCHAR(250) NOT NULL
        );
    `);

    console.log('writing to database!');


    const copyPath = path.join(__dirname, './sdc-sample-postgresql-data.csv');
    const ec2Path = '/var/lib/pgsql92/sdc-sample-postgresql-data.csv';
    console.log(copyPath);

    await client.query(`
      COPY MovieInfo FROM ${ec2Path} WITH (FORMAT CSV, HEADER);
    `);

    console.log('adding auto serial index column named "id"!');
    await client.query(`
      ALTER TABLE movieinfo ADD COLUMN id SERIAL PRIMARY KEY;
    `);

    // await client.query(`
    //   INSERT INTO movieinfo (id) SELECT g.id FROM generate_series(1, 100000) AS g (id);
    // `);
    // NOT CONCURRENTLY, NOT MULTI COLUMN (releaseyear)

    console.log('commiting!');
    await client.query('COMMIT');
    // Transaction END!
    console.timeEnd('timing seed');
  } catch (e) {
    await client.query('ROLLBACK');
    console.log('error!');
    throw e;
  } finally {
    console.log('releasing...');
    await client.release();
  }
};

seedPostgres().catch(e => console.error(e.stack));
