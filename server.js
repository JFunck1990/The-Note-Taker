const express = require("express");
const fs = require("fs");
const path = require('path');

// initial
const app = express();
const port = process.env.Port || 3000;