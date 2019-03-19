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

//Add a song to the database
// Expects a song object on the request body with
//properties for "track", "artist", "rank", "published"
app.post('/songs', (req, res) => {
    let song = req.body;
    let sqlText = `INSERT INTO "songs" ("rank", "track", "artist", "published") VALUES ($1, $2, $3, $4)`;
    pool.query(sqlText, [song.rank, song.track, song.artist, song.published] )
    .then( (response) =>{
        res.sendStatus(201);
    }).catch( (error) => {
        console.log('Fail to insert new song', song);
        console.log(error);
        res.sendStatus(500);
    })
})




const PORT = process.env.PORT || 5000; 
app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
   