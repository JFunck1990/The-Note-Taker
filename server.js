const express = require("express");
const fs = require("fs");
const path = require('path');

// initialize express
const app = express();
const PORT = process.env.Port || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function(req,res) {
	res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));