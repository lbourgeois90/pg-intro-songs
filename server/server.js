const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json());
app.use ( express.static( 'server/public' ) );

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



//Get songs from database
app.get('/songs', (req,res) => {
    pool.query('SELECT * FROM "songs" ORDER BY "track";')
    .then((result) => {
        res.send(result.rows)

    })
    .catch((error) =>{
        console.log(`Error getting all songs!`);
        res.sendStatus(500);
    })
})







const PORT = process.env.PORT || 5000; 
app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
   