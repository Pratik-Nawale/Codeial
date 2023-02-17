const Post = require("../models/post")

module.exports.home =function(req, res){
    // used to access the cookie from the browser
    // console.log(req.cookies);
    
    // used to send cookies to the browser
    // res.cookie("user_id", 25)

    // Post.find({}, function(err,posts){
    //     return res.render("home", {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate("user")
    .populate({
        path: "comments",
        populate:{
            path: "user"
        }
    })
    .exec(function(err, posts){
        return res.render("home",{
            title: "Codeial | Home",
            posts: posts
        });
    })
};

// module.exports.actionName = function(req, res){}