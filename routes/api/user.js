const express = require("express");
const router = express.Router();
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const validateSignUpInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");