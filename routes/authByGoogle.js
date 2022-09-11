const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const schemas = require("../dbServices/schemas/schemas")
const userSchema = schemas.userSchema
const bcrypt = require("bcrypt")
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'http://www.example.com/oauth2/redirect/google'
  },
  function(issuer, profile, cb) {
    console.log(issuer, profile)
  }
));