const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

//define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//add routes
app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/api/user/", require("./routes/api/user"));
app.use("/api/post/", require("./routes/api/post"));


//connect to the Mongo DB
mongoose
.connect(MONGO_URI, { useNewurlParser: true })
.then(() => console.log("Mongo Connection successful"))
.catch(err => console.log("err"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;



//start the server
app.listen(PORT, function() {
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});