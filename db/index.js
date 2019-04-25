const { Pool } = require('pg');
const path = require('path');
const { config } = require('../postgres_config');
const pool = new Pool(config);
