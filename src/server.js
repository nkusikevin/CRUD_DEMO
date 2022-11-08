const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

var corsOptions = {
	origin: "http://localhost:19006",
	optionsSuccessStatus: 200, // For legacy browser support
	methods: "GET, PUT, POST, DELETE, OPTIONS",
};

// create express app
const app = express();
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Exiting now...", err);
		process.exit();
	});

// define a simple route
app.get("/", (req, res) => {
	res.json({
		message:
			"Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
	});
});
require("./app/routes/note.routes.js")(app);
// listen for requests
app.listen(8000, () => {
	console.log("Server is listening on port ", 8000);
});
