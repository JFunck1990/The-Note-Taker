//Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
let theNotes;
//https://github.com/uuidjs/uuid#deep-requires-now-deprecated
//https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js
const { v4: uuidv4 } = require('uuid');
console.log("this is uuid: " + uuidv4());

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
    theNotes = JSON.parse(data);

    console.log("this is the notes: " + theNotes);
});
//need to ask to make sure it is *
// Routs

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req,res) => {
	res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      // Parses TheNotes as a string and returns ad a object
      theNotes = JSON.parse(data);
      console.log("this is the notes: " + theNotes);
      res.json(theNotes);
    });
  });
  
app.post("/api/notes", (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    theNotes.push(newNote);
console.log("This is newNote" + newNote);

//takes the notes, stringify them and writes the notes in db.json.
fs.writeFile("db/db.json",JSON.stringify(theNotes), err => {
    if (err) throw err;
});

    res.json(newNote);
});


app.get("/api/notes/:id", (req,res) =>{
    res.json(theNotes[req.params.id]);
});

app.delete("/api/notes/:id", (req,res) => {
    let id = req.params.id;
    console.log(id);
    let t = theNotes.filter((n => n.id !== id))
    console.log("Filtered notes: "+JSON.stringify(t));

    fs.writeFile("db/db.json",JSON.stringify(t), err => {
        if (err) throw err;
    });

    res.json(t);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
