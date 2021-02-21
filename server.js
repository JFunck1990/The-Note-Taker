const express = require("express");
const fs = require("fs");
const path = require('path');

// initialize express
const app = express();
const PORT = process.env.Port || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));