"use strict"
const signUpRouter = require("express").Router();
const signUpHandler = require("../handlers/signUpHandler")

signUpRouter.get("/", signUpHandler.getSignUpPage)

signUpRouter.post("/", signUpHandler.postSignUpPage)

module.exports = signUpRouter;