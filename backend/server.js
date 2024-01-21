const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes")
const mongoose = require('mongoose')

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/",authRoutes);

app.listen(port, () => {
	console.log(`Success! Your application is running on port ${port}.`);
});