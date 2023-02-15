const User = require("../models/user")

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
        // console.log("different password", req.body.password, req.body.confirm_password);
        return res.redirect("back");
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error in finding user while signing up");
            return;
        }

        if(!user){
            // console.log(req.body);
            User.create(req.body, function(err, user){
                if(err){
                    console.log("error in creating a user while signing up", err);
                    // console.log(req.body)
                    return;
                }

                return res.redirect("/users/sign-in");
            })
        }
        else{
            return res.redirect("back");
        }
    });
}

// sign in and create session for the user
module.exports.createSession = function(res, req){
    //  TODO  later
}