"use strict"
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //only extract the strategy class//
const client = require("./dbConnection");


const localStrategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'  //the actual value will pass to the next line's parameter
    },
    async function (username, password, done) {
        try {
            let sqlStatement = `select * from note_users where username = $1`
            let dataArray = [username]
            let user = await client.query(sqlStatement, dataArray);
            user = user.rows[0]
            console.log(user)
            if (user.length <= 0) {
                done(null, false, { message: "email not exist" })
                console.log('failed')
            }
            if (user.password == password) {
                console.log('success')
                done(null, user)
            }
            else {
                console.log(user.password)
                console.log(password)
                done(null, false, { message: "password not correct" })
                console.log('failed in pw')
            }
        }
        catch (err) {
            done(err);
            console.log('system error')
        }
    }
)

const serializeUserCB = function (user, done) {
    let authData = user.username
    done(null, authData);
}

const deserializeUserCB = async function (authData, done) {
    try {
        let sqlStatement = `select * from note_users where username = $1`
        let dataArray = [authData]
        let user = await client.query(sqlStatement, dataArray);
        user = user.rows[0]
        if (user.length === 0) {
            return done(new Error("Wrong user email"));
        }
        return done(null, user); //success and passto atuh user' callback function(err,user,info)

    } catch (err) {
        return done(err);
    }
}

const authSetUp = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
console.log('hey')
    passport.use("local", localStrategy); //register local to handle local strategy
   console.log('passport')
    passport.serializeUser(serializeUserCB)
    passport.deserializeUser(deserializeUserCB)
    console.log('gg')
}

const isAuth = function(req,res,next){
    if(req.isAuthenticated()){ //req.isAuthenticated return turn or false via deserialize, if deserialize is ok => true
        next(); //go to next middleware
    }
    else{
        res.redirect("./login");
    }
}

const cancelAuth = function(req,res,next){
    req.logout();
    res.redirect("./login");
}

const authUser = function (req, res, next) {
    passport.authenticate("local", function (err, user, info) { //done method // info would be when wrong user emil..
        if (err) {
            return next(err); //system error
        }
        if (!user) {
            // return res.redirect("/login"); //wrong username/passpord
            res.send('password wrong')
        }
        req.login(user, function(err){ //success
            if(err){
                return next(err);

            }
            return res.redirect("/notesWords");
        })
    })(req, res, next); //req, res throw back to passport.authenticate's callback (function(err,user,info)) to use!! , which will use for the req.login
}


module.exports.authUser = authUser;
module.exports.authSetUp = authSetUp;
module.exports.isAuth = isAuth;
module.exports.cancelAuth = cancelAuth;