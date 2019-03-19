const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json());
app.use ( express.static( 'server/public' ) );


const songRouter = require('./module/song.router');
app.use('/songs', songRouter);



const PORT = process.env.PORT || 5000; 
app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
   