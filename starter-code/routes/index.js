const express = require('express');
const router  = express.Router();
const Post    = require("../models/post");
const multer     = require('multer');
const User       = require('../models/user');
var upload       = multer({ dest: './public/uploads/' });
const passport   = require('passport');
const ensureLogin = require('connect-ensure-login');
const Comment = require("../models/comment");

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({}, (err, posts) => {
    if(err){
      console.log("ERROR", err);
    }
    else {
      res.render("index", {title: "Iron Tumblr", posts});
    }
  })
});

router.get('/new', (req, res, next) => {
  res.render("new");
});

router.post('/new', ensureLogin.ensureLoggedIn(), upload.single('photo'), (req, res, next) => {
  const post = new Post({
    content: req.body.content,
    creatorId: req.user.id,
    picPath: `uploads/${req.file.filename}`,
    picName: req.body.picName
  });
  post.save(err => {
    res.redirect("/");
  })
});

router.post('/comment/:postId', ensureLogin.ensureLoggedIn(), upload.single('photo'), (req, res, next) =>{
  let postId = req.params.postId;
  
  Post.findById(postId, (err, result) => {
    const comment = new Comment({
      content: req.body.comment,
      authorId: req.user._id,
      imagePath: `uploads/${req.file.filename}`,
      imageName: req.body.imgName
    })
    // const comment = {
    //   content: req.body.comment,
    //   authorId: req.user._id,
    //   imagePath: `uploads/${req.file.filename}`,
    //   imageName: req.body.imgName
    // }

    result.comments.push(comment);
    console.log(result)
    result.save((err, result) => {
      console.log(err, result)
      res.redirect("/")});
  })
})


module.exports = router;
