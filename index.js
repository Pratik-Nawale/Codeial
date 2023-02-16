const express = require("express");
const cookieParser = require("cookie-parser")
const { route } = require("./routes");
const port = 8000;

const app = express();

const db = require("./config/mongoose");
const { urlencoded } = require("express");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-startegy")

app.use(cookieParser());
app.use(express.urlencoded())

app.use(express.static("./assets"));



// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use("/", require("./routes"))


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    else{
        console.log(`server is up and running on the port: ${port}`)
    }
})