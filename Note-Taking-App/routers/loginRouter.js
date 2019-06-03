"use strict"
const loginRouter = require("express").Router();
const loginHandler = require("../handlers/loginHandler")
const auth = require("../authentication");

loginRouter.get("/", loginHandler.getLoginPage)

loginRouter.post("/", auth.authUser)

module.exports = loginRouter;