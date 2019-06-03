"use strict"

exports.getLoginPage = function (req,res, next){


    let loginObject = {layout: 'login', loginCounter:'loginCounter' }
    res.render('layouts/login', loginObject)
}