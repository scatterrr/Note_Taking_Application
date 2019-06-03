"use strict"
const SQLQuery = require('./notesWordsSQLQuery')


exports.getSignUpPage = function (req, res, next) {

    let signUpObject = { layout: 'login' }
    res.render('signUp', signUpObject)
}

exports.postSignUpPage = function (req, res, next) {
    let query = `INSERT INTO NOTE_USERS (USERNAME, PASSWORD)
VALUES($1,$2)`

    let dataArray = [req.body.username, req.body.password]
    SQLQuery.sqlQueryWithArray(query, dataArray)

    res.redirect('/')
}
