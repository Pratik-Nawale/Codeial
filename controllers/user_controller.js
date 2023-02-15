module.exports.profile = function(req, res){
    res.end("<h1>User Profile</h1>");
}

// render the sign up page
module.exports.signup = function(req, res){
    res.render("user_sign_up", {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page 
module.exports.signin = function(req, res){
    res.render("user_sign_in", {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }

    
}

// sign in and create session for the user
module.exports.createSession = function(res, req){
    //  TODO  later
}