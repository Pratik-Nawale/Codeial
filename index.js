const express = require("express");
const cookieParser = require("cookie-parser")
const { route } = require("./routes");
const port = 8000;

const app = express();

const db = require("./config/mongoose");
const { urlencoded } = require("express");

app.use(express.urlencoded())
app.use(cookieParser());


app.use(express.static("./assets"));


// use express router
app.use("/", require("./routes"))

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");




app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    else{
        console.log(`server is up and running on the port: ${port}`)
    }
})