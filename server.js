var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

var mysql = require("mysql");
var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

connection.query('Eat a burger or select a new one to eat', function(err, rows, fields) {
  if (err) throw err;

  console.log('Burgers eaten ', rows[0]);
});

connection.end();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("views/assets"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgerController.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});