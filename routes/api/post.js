const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");
const validatePostInput = require("../../validation/post");

passport.authenticate('jwt', {session:false})

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
       Post.find({ author: req.user.user_name })
          .then(posts => res.status(200).json(posts))
          .catch(err =>
             res
                .status(400)
                .json({ user: "Error fetching posts of logged in user" })
          );
    }
 );
 router.get("/post/:id", (req, res) => {
    Post.find({ _id: req.params.id })
       .then(post => res.status(200).json(post))
       .catch(err => res.status(400).json({ id: "Error fetching post by id" }));
 });
 router.get("/author/:author", (req, res) => {
    Post.find({ author: req.params.author })
       .then(posts => res.status(200).json(posts))
       .catch(err =>
          res
             .status(400)
             .json({ author: "Error fetching posts of specific author" })
       );
 });
 