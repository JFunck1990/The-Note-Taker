//Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// initialize express app
const app = express();
const PORT = process.env.Port || 3000;

fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);

    console.log("this is the notes" + notes);

// sets up express app for data parsing
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '/public')));

//Routs


//need to ask to make sure it is *
app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("/api/notes", (req,res) => {
    res.json(notes);
});
// setting up api post rout
app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    notes.push(newNote);

} );
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
