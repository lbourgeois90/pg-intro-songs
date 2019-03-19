const express = require('express');

const router = express.Router();

const pool = require('./pool');


//Get songs from database
router.get('/', (req,res) => {
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
router.post('/', (req, res) => {
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

module.exports = router;