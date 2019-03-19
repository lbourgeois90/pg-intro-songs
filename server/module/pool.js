const pg = require('pg');

//Setup PG to talk to our song database
const Pool = pg.Pool;
const pool = new Pool({
    database: 'atbash-songs', //YOU WILL CHANGE THIS FOR EACH APP
    host: 'localhost',
    port: 5432,
    max: 10, //max connections in pool
    idleTimeoutMillis: 30000 //30 to try and connect-- its in millisec 
})

//These pool.on's are not required for things to work, but are great 
//for debugging.
pool.on('connect', () => {
    console.log(`Postgres connected!`);
})

pool.on('error', () => {
    console.log('Database Error', error);
})

module.exports = pool;