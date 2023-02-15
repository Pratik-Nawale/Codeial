const User = require("../models/user")

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render("user_profile",{
                    title: "User Profile",
                    user: user
                });
            }
            else{
                return res.redirect("/users/sign-in");
            }
        });
    }
    // we have to keep one else block otherwise the redirection happens asynchronously i.e, 
    // the redirection happens at the time of checking of the if condition
    else{
        return res.redirect("/users/sign-in");
    }
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
module.exports.createSession = function(req, res){
    // console.log(req.body);


    // ? Steps to authenticate
    //  find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error in finding user while signing in");
            return;
        }
        //  handle user found

        if(user){

            // handle password which don't match
            if(user.password != req.body.password){
                return res.redirect("back");
            }

            // handle session creation
            res.cookie("user_id", user.id);
            return res.redirect("/users/profile");
        }

        else{
            // handle user not found

            return res.redirect("back");
        }

    });

}