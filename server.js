const express = require("express");
const fs = require("fs");
const path = require('path');

// initialize express
const app = express();
const port = process.env.Port || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
