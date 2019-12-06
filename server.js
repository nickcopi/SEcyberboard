const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const state = require('./scraper');
const PORT = 8083;

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.get('/api/getScoreboard',(req,res)=>{
	res.send(state.teams);
});

app.listen(PORT,()=>{
	console.error(`Listening on port ${PORT}.`);
});
