//Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// initialize express app
const app = express();
const PORT = process.env.PORT || 3000;


// sets up express app for data parsing
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '/public')));


//reading the db.json file
fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

// Parses TheNotes as a string and returns ad a object
    const theNotes = JSON.parse(data);

    console.log("this is the notes: " + theNotes);

//need to ask to make sure it is *
// Routs

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req,res) => {
	res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get("/api/notes", (req,res) => {
    res.json(theNotes);
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    theNotes.push(newNote);
//takes the notes, stringify them and writes the notes in db.json.
fs.writeFile("db/db.json",JSON.stringify(theNotes), err => {
    if (err) throw err;
});

    res.json(newNote);
});


});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
