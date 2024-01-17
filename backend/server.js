const express = require('express');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Success! Your application is running on port ${port}.`);
});