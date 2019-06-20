"use strict" // variable must be declared (eg., const let)
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const path = require('path');
const auth = require("./authentication")
const session = require('express-session')
const hb = require('express-handlebars');
require('dotenv').config();
const app = express();

app.engine('handlebars', hb({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const sessionOptions = {
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(express.static(path.join(__dirname, 'public')));
auth.authSetUp(app);


app.get("/", async (req, res) => {
    res.redirect("/login")
})
const noteRouter = require('./routers/noteRouter.js')
const loginRouter = require("./routers/loginRouter")
const signUpRouter = require("./routers/signUpRouter")



app.use('/notesWords', auth.isAuth, noteRouter)
app.use("/login", loginRouter)
app.use("/signUp", signUpRouter)
app.use("/logout", auth.cancelAuth, (req, res, next) => {
    res.redirect('/login')
})

const hostname = 'localhost';
const port = process.env.DB_LOCALPORT

app.listen(port, hostname, function () {
    console.log(`The ${hostname} server listening port ${port}`)
});


//basic auth
//const basicAuth = require('basic-auth')

// const auth = function(req, res, next) {
//     function unauthorized(res) {
//         res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//         res.status(401);
//         return res.end();
//     }

//     console.log(req.headers);
//     let userInput = basicAuth(req);
//     console.log(userInput);

//     if (!userInput || !userInput.name || !userInput.pass) {
//         return unauthorized(res);
//     }
//     else{client.query('SELECT * FROM note_users', function(err, result){
//         if(err){
//             res.send(401, 'unauthorized');
//         }
//         else{

//             let list = result.rows;
//             console.log(list);
//             for(let i = 0; i < list.length; i++){
//                 if (list[i].username == userInput.name && list[i].password == userInput.pass){

//                     req.user = list[i]
//                     console.log('check 1');
//                     return next();
//                 }
//             }
//         }
//     })}


// }

// app.use(auth)


// app.set('views', path.join(__dirname, 'views'))

// var pg = require('pg');
// var config = {
//     user: 'wah',
//     database: 'postgres',
//     password: 'postgres', //whatever your password is, the default is postgres or password, try both
//     host: 'localhost',
//     port: 5432,
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// }

// var client = new pg.Client(config);
// client.connect();


//application middleware use
//mount specific url endpoint to specific router middleware


// const AuthChallenger = require('./handlers/AuthChallenger')
