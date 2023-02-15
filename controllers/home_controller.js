module.exports.home =function(req, res){
    // used to access the cookie from the browser
    console.log(req.cookies);
    
    // used to send cookies to the browser
    res.cookie("user_id", 25)

    res.render("home", {
        title: "Home"
    })
};

// module.exports.actionName = function(req, res){}