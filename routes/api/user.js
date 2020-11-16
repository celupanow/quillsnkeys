const express = require("express");
const router = express.Router();
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const validateSignUpInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

router.post ("/signup", (req, res) => {
    const {errors, isValid} = validateSignUpInput(req.body);
    const {username, email, password} = req.body;
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({$or:[{email}, {username}]}).then(user => {
        if (user) {
            if (user.email === email)
            return res.status(400).json({ email: "Email already exists" });
            else
                return res
                .status(400)
                .json({ username: "Username already exists" });
        } else {
            const newUser = new User({ username, email, password });
            //hashing password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw (err);
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err =>
                        console.log({ error: "Error creating new user" }));
                });
            });
        }
    });
});