const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//add routes
app.use(routes);

//connect to the Mongo DB
mongoose.connect(process.env.MONBODB_URI || "mongodb://localhost/quillsnkeys");

//start the server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});