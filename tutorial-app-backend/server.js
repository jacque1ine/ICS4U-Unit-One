const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
   origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
db.mongoose
   .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      console.log("Connected to the database!");
   })
   .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
   });

//bringing in the routes that we are exposing the web services using expresss 
require("./app/routes/tutorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});

